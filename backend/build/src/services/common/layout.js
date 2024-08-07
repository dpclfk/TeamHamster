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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.session.store);
        if (req.session.store) {
            req.body.user = yield models_1.Store.findOne({
                where: { id: req.session.store },
                attributes: ["id", "nick", "point"],
                raw: true,
            });
            const check = yield models_1.User.findOne({
                where: { id: req.body.user.id },
            });
            req.body.user.admin = check === null || check === void 0 ? void 0 : check.admin;
            req.body.user.delivery = check === null || check === void 0 ? void 0 : check.delivery;
        }
        console.log(req.body.user);
        res.json({ login: req.body.user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
