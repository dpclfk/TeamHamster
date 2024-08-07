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
    const redirectUrl = req.body.callbackUrl;
    const tokenEndpoint = "https://oauth2.googleapis.com/token";
    const client_id = process.env.CLIENT_G_ID;
    const client_secret = process.env.CLIENT_G_SECRET;
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", client_id);
    params.append("client_secret", client_secret);
    params.append("redirect_uri", redirectUrl);
    params.append("grant_type", "authorization_code");
    const transaction = yield models_1.sequelize.transaction();
    try {
        const response = yield axios_1.default.post(tokenEndpoint, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const accessToken = response.data.access_token;
        // 여기서 추가로 사용자 정보 요청
        const userInfoResponse = yield (yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })).data;
        if (!userInfoResponse) {
            throw Error("err");
        }
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
        /// name = given_name 에서 앞 4글자
        const registname = userInfoResponse.given_name.slice(0, 4);
        /// 회원가입 코드
        if (!emailcheck) {
            const name = yield models_1.Name.findOne({
                where: { name: registname },
            });
            const nickcheck = yield models_1.Store.findOne({
                where: { nick: userInfoResponse.name },
            });
            if (nickcheck) {
                throw Error("duplication nick");
            }
            const regist = yield models_1.User.create({
                email: encryptionemail,
                password: encryptionpw,
                Oauth: "구글",
            }, { transaction });
            const store = yield models_1.Store.create({
                nick: userInfoResponse.name,
                profileimg: userInfoResponse.picture,
            }, { transaction });
            if (name) {
                yield transaction.commit();
                yield name.addUser(regist);
            }
            else {
                const newname = yield models_1.Name.create({
                    name: registname,
                });
                yield transaction.commit();
                yield newname.addUser(regist);
            }
            yield regist.setStore(store);
        }
        /// 여기부터 로그인코드
        const usercheck = yield models_1.User.findOne({
            where: { email: encryptionemail, password: encryptionpw, Oauth: "구글", admin: false },
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
