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
exports.default = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.Product.findAll({
            where: { itemState: "픽업 대기" },
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
        res.json({ product: product });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
