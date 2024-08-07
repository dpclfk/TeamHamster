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
        const nowstoreid = req.query.id;
        let product = yield models_1.Product.findAndCountAll({
            where: { purchaseId: nowstoreid },
            attributes: ["id", "title", "discription", "price", "createdAt", "itemState", "img"],
            include: [
                { model: models_1.DeliveryCost, as: "DeliveryCost", attributes: ["cost"] },
                { model: models_1.Category, as: "Category", attributes: ["name"] },
            ],
        });
        for (let i = 0; i < product.rows.length; i++) {
            if (product.rows[i].img) {
                const splimg = product.rows[i].img.split(",");
                product.rows[i].dataValues.image = splimg;
                if (product.rows[i].itemState == "픽업 대기" ||
                    product.rows[i].itemState == "픽업 중" ||
                    product.rows[i].itemState == "픽업 완료") {
                    product.rows[i].itemState = "배송중";
                }
                else if (product.rows[i].itemState == "배송 완료") {
                    product.rows[i].itemState = "배송중";
                    product.rows[i].userCheck = true;
                }
                else if (product.rows[i].itemState == "구매 확정") {
                    product.rows[i].itemState = "구매 완료";
                    const duplicationcheck = yield models_1.Review.findOne({
                        where: { productId: product.rows[i].id, storeId: nowstoreid },
                    });
                    if (duplicationcheck) {
                        product.rows[i].userCheck = true;
                    }
                }
            }
        }
        res.json({ product: product });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
