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
        if (!reqbody.user) {
            throw Error("not login");
        }
        const nowproid = req.params.id;
        const nowuser = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        if (!nowuser) {
            throw Error("not find user");
        }
        const product = yield models_1.Product.findOne({
            where: { id: nowproid },
        });
        if ((product === null || product === void 0 ? void 0 : product.itemState) != "판매중") {
            throw Error("not Sell");
        }
        const deliverycost = yield models_1.DeliveryCost.findOne({
            order: [["id", "DESC"]],
            attributes: ["id", "cost"],
        });
        const delcost = (deliverycost === null || deliverycost === void 0 ? void 0 : deliverycost.cost) || 5000;
        let pointcheck = nowuser.point - product.price - delcost;
        if (pointcheck < 0) {
            throw Error("not have point");
        }
        const Purchaseaddress = yield models_1.ExtraAddress.findOne({
            where: { id: reqbody.extraAddressId },
        });
        yield (deliverycost === null || deliverycost === void 0 ? void 0 : deliverycost.addProduct(product));
        yield (nowuser === null || nowuser === void 0 ? void 0 : nowuser.addPurchase(product));
        yield (Purchaseaddress === null || Purchaseaddress === void 0 ? void 0 : Purchaseaddress.addPurchaseAddress(product));
        yield (product === null || product === void 0 ? void 0 : product.update({ itemState: "픽업 대기" }));
        yield (nowuser === null || nowuser === void 0 ? void 0 : nowuser.update({ point: pointcheck }));
        const nowhistory = yield models_1.PointHistory.create({
            point: -product.price - delcost,
            history: `${product.title} 상품 구매`,
        });
        yield (nowuser === null || nowuser === void 0 ? void 0 : nowuser.addPointHistory(nowhistory));
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else if (err.message == "not find user") {
            res.status(400).json({ result: "not find user" });
        }
        else if (err.message == "not Sell") {
            res.status(400).json({ result: "not Sell" });
        }
        else if (err.message == "not have point") {
            res.status(400).json({ result: "not have point" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
