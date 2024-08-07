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
    const transaction = yield models_1.sequelize.transaction();
    try {
        const reqbody = req.body;
        const selectproduct = req.params.id;
        if (!reqbody.user) {
            throw Error("not login");
        }
        const nowuser = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        if (nowuser === null || nowuser === void 0 ? void 0 : nowuser.block) {
            throw Error("block");
        }
        const product = yield models_1.Product.findOne({
            where: { id: selectproduct, itemState: "구매 확정" },
        });
        if (!product) {
            throw Error("not found product");
        }
        const duplicationcheck = yield models_1.Review.findOne({
            where: { productId: selectproduct, storeId: reqbody.user.id },
        });
        const reviewWrite = yield models_1.Review.create({
            star: reqbody.star,
            reviewContent: reqbody.content,
        }, { transaction });
        if (duplicationcheck) {
            throw Error("duplication review");
        }
        else {
            yield transaction.commit();
            yield (product === null || product === void 0 ? void 0 : product.addReview(reviewWrite));
            yield (nowuser === null || nowuser === void 0 ? void 0 : nowuser.addReview(reviewWrite));
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else if (err.message == "duplication review") {
            res.status(400).json({ result: "duplication review" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
