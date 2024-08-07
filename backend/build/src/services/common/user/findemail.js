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
    try {
        dotenv_1.default.config();
        const reqbody = req.body;
        const key = crypto_1.default.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
        const iv = Buffer.from(`${process.env.IV}`, "base64");
        const usercheck = yield models_1.User.findOne({
            where: { mobile: reqbody.mobile, Oauth: "햄스터" },
            attributes: ["email", "nameId"],
        });
        if (!usercheck) {
            throw Error("not find email");
        }
        console.log(usercheck);
        const namecheck = yield models_1.Name.findOne({
            where: { id: usercheck.nameId, name: reqbody.name },
        });
        if (!namecheck) {
            throw Error("not find email");
        }
        const decipher = crypto_1.default.createDecipheriv("aes-256-gcm", key, iv);
        let findemail = decipher.update(usercheck.email, "hex", "utf-8");
        res.json({ email: findemail });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not find email") {
            res.status(400).json({ result: "not find email" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
