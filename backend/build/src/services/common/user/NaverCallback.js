"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../../../models");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const code = req.query.code;
    const state = req.query.state;
    const redirectUrl = req.body.callbackUrl;
    const client_id = process.env.CLIENT_N_ID;
    const client_secret = process.env.CLIENT_N_SECRET;
    const tokenEndpoint = "https://nid.naver.com/oauth2.0/token";
    const transaction = yield models_1.sequelize.transaction();
    try {
        const response = yield axios_1.default.post(tokenEndpoint, null, {
            params: {
                grant_type: "authorization_code",
                client_id: client_id,
                client_secret: client_secret,
                redirect_uri: redirectUrl,
                code: code,
                state: state,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const accessToken = response.data.access_token;
        // 여기서 추가로 사용자 정보 요청
        const userInfoResponse = yield (yield axios_1.default.get("https://openapi.naver.com/v1/nid/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })).data.response;
        console.log(userInfoResponse);
        if (!userInfoResponse) {
            throw Error("err");
        }
        /// 여기부터 회원가입 코드
        const key = crypto_1.default.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
        const iv = Buffer.from(`${process.env.IV}`, "base64");
        const cipher = crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
        const encryptionemail = cipher.update(`${userInfoResponse.email}`, "utf-8", "hex");
        const emailcheck = yield models_1.User.findOne({
            where: { email: encryptionemail },
        });
        const encryptionpw = crypto_1.default
            .createHash("sha512")
            .update(`${userInfoResponse.id + process.env.SALT}`)
            .digest("hex");
        if (!emailcheck) {
            const name = yield models_1.Name.findOne({
                where: { name: userInfoResponse.name },
            });
            const nickcheck = yield models_1.Store.findOne({
                where: { nick: userInfoResponse.nickname },
            });
            if (nickcheck) {
                throw Error("duplication nick");
            }
            const navermobile = userInfoResponse.mobile_e164.replace("+82", "0");
            const regist = yield models_1.User.create({
                email: encryptionemail,
                password: encryptionpw,
                mobile: navermobile,
                Oauth: "네이버",
            }, { transaction });
            const store = yield models_1.Store.create({
                nick: userInfoResponse.nickname,
                mobile: navermobile,
                profileimg: userInfoResponse.profile_image,
            }, { transaction });
            if (name) {
                yield transaction.commit();
                yield name.addUser(regist);
            }
            else {
                const newname = yield models_1.Name.create({
                    name: userInfoResponse.name,
                });
                yield transaction.commit();
                yield newname.addUser(regist);
            }
            yield regist.setStore(store);
        }
        /// 여기부터 로그인코드
        const usercheck = yield models_1.User.findOne({
            where: { email: encryptionemail, password: encryptionpw, Oauth: "네이버", admin: false },
        });
        if (usercheck) {
            req.session.store = usercheck.id;
        }
        else {
            throw Error("not match user");
        }
        res.status(200).json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        if (err.message == "duplication nick") {
            res.status(400).json({ result: "duplication nick" });
        }
        else if (err.message == "not match user") {
            res.status(400).json({ result: "not match user" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
