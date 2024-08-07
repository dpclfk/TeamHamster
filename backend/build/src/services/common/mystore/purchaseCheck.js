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
        const nowproid = req.params.id;
        if (!nowproid) {
            throw Error("err");
        }
        const product = yield models_1.Product.findOne({
            where: { id: nowproid, itemState: "배송 완료" },
            attributes: ["id", "sellId", "price", "title"],
        });
        if (!product) {
            throw Error("not find");
        }
        yield (product === null || product === void 0 ? void 0 : product.update({ itemState: "구매 확정" }));
        const selluser = yield models_1.Store.findOne({
            where: { id: product.sellId },
        });
        const nowhistory = yield models_1.PointHistory.create({
            point: product.price,
            history: `${product.title} 상품 판매`,
        });
        yield (selluser === null || selluser === void 0 ? void 0 : selluser.update({ point: selluser.point + product.price }));
        yield (selluser === null || selluser === void 0 ? void 0 : selluser.addPointHistory(nowhistory));
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
