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
        const selectproduct = req.params.id;
        const waitepickup = yield models_1.Product.findOne({
            where: { id: selectproduct, itemState: "픽업 중" },
        });
        if (waitepickup) {
            waitepickup.update({ itemState: "픽업 완료" });
            mongoDB_1.delivery.create({
                userId: reqbody.user.id,
                productId: waitepickup.id,
                spotX: reqbody.spotX,
                spotY: reqbody.spotY,
            });
        }
        else {
            throw Error("not choice pickup");
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
