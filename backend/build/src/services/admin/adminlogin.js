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
const models_1 = require("../../models");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dotenv_1.default.config();
        const reqbody = req.body;
        const key = crypto_1.default.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
        const iv = Buffer.from(`${process.env.IV}`, "base64");
        const cipher = crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
        let encryptionemail = cipher.update(`${reqbody.email}`, "utf-8", "hex");
        const encryptionpw = crypto_1.default
            .createHash("sha512")
            .update(`${reqbody.pw + process.env.SALT}`)
            .digest("hex");
        const usercheck = yield models_1.User.findOne({
            where: { email: encryptionemail, password: encryptionpw, Oauth: "햄스터", admin: true },
        });
        if (usercheck) {
            req.session.store = usercheck.id;
        }
        else {
            throw Error("not match user");
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not match user") {
            res.status(400).json({ result: "not match user" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
