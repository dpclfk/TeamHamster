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
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const models_1 = require("../../../models");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield models_1.sequelize.transaction();
    try {
        dotenv_1.default.config();
        const reqbody = req.body;
        const name = yield models_1.Name.findOne({
            where: { name: reqbody.name },
        });
        const nickcheck = yield models_1.Store.findOne({
            where: { nick: reqbody.nick },
        });
        if (nickcheck) {
            throw Error("duplication nick");
        }
        const key = crypto_1.default.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
        const iv = Buffer.from(`${process.env.IV}`, "base64");
        const cipher = crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
        const encryptionemail = cipher.update(`${reqbody.email}`, "utf-8", "hex");
        const emailcheck = yield models_1.User.findOne({
            where: { email: encryptionemail },
        });
        if (emailcheck) {
            throw Error("duplication email");
        }
        const encryptionpw = crypto_1.default
            .createHash("sha512")
            .update(`${reqbody.pw + process.env.SALT}`)
            .digest("hex");
        const nowmobile = reqbody.mobile.replaceAll("-", "");
        const regist = yield models_1.User.create({
            email: encryptionemail,
            password: encryptionpw,
            mobile: nowmobile,
        }, { transaction });
        const store = yield models_1.Store.create({
            nick: reqbody.nick,
            mobile: nowmobile,
        }, { transaction });
        if (name) {
            yield transaction.commit();
            yield name.addUser(regist);
        }
        else {
            const newname = yield models_1.Name.create({
                name: reqbody.name,
            });
            yield transaction.commit();
            yield newname.addUser(regist);
        }
        yield regist.setStore(store);
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        if (err.message == "duplication nick") {
            res.status(400).json({ result: "duplication nick" });
        }
        else if (err.message == "duplication email") {
            res.status(400).json({ result: "duplication email" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
