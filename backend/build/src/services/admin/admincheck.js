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
const models_1 = require("../../models");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        if (!reqbody.user) {
            throw Error("not login");
        }
        const admincheck = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
            include: [{ model: models_1.User, as: "User", where: { admin: true } }],
        });
        if (!admincheck) {
            throw Error("not admin");
        }
        next();
    }
    catch (err) {
        console.error(err);
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else if (err.message == "not admin") {
            res.status(400).json({ result: "not admin" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
