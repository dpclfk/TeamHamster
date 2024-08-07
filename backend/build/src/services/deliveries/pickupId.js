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
const mongoDB_1 = require("../../models/mongoDB");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        const waitepickup = yield models_1.Product.findAll({
            where: { id: reqbody.id, itemState: "픽업 대기" },
        });
        if (waitepickup.length == 0) {
            throw Error("other pickup");
        }
        for (let i = 0; i < waitepickup.length; i++) {
            waitepickup[i].update({ itemState: "픽업 중" });
            mongoDB_1.delivery.create({
                userId: reqbody.user.id,
                productId: waitepickup[i].id,
            });
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        if (err.message == "other pickup") {
            res.status(400).json({ result: "other pickup" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
