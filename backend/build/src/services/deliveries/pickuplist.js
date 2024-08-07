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
        const deliveryfind = yield mongoDB_1.delivery
            .find({ userId: reqbody.user.id })
            .distinct("productId");
        // 찜한 상품 리스트 보기
        const waitpickup = yield models_1.Product.findAll({
            where: { id: deliveryfind, itemState: "픽업 중" },
            attributes: ["id", "itemState"],
            include: [
                {
                    model: models_1.ExtraAddress,
                    as: "SellAddress",
                    attributes: ["detailAddress"],
                    include: [{ model: models_1.Address, as: "Address", attributes: ["address"] }],
                },
            ],
        });
        res.json({ product: waitpickup });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
