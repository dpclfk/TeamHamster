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
const models_1 = require("../../../models");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dotenv_1.default.config();
        const reqbody = req.body;
        const encryptionpw = crypto_1.default
            .createHash("sha512")
            .update(`${reqbody.pw + process.env.SALT}`)
            .digest("hex");
        yield models_1.User.update({ password: encryptionpw }, { where: { id: req.session.finduser } });
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
