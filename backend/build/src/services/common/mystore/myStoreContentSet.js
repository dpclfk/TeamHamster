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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        const nowstoreid = req.query.id;
        if (reqbody.user.id != nowstoreid) {
            throw Error("not match user");
        }
        yield models_1.Store.update({
            introduction: reqbody.content,
        }, { where: { id: nowstoreid } });
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
