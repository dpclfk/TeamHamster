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
        console.log(req.body.idx, "인덱스");
        const cateid = [];
        const firstcate = yield models_1.Category.findAll({
            attributes: ["id"],
            where: { preCateId: req.params.id },
        });
        for (let i = 0; i < firstcate.length; i++) {
            cateid.push(firstcate[i].id);
        }
        const secondcate = yield models_1.Category.findAll({
            attributes: ["id"],
            where: { preCateId: [...cateid] },
        });
        for (let i = 0; i < secondcate.length; i++) {
            cateid.push(secondcate[i].id);
        }
        let productlist = yield models_1.Product.findAll({
            attributes: [
                "id",
                "title",
                "discription",
                "price",
                "createdAt",
                "itemState",
                "img",
                "categoryId",
            ],
            include: [
                {
                    model: models_1.Category,
                    as: "Category",
                    attributes: ["name"],
                    where: { id: [req.params.id, ...cateid] },
                },
            ],
            offset: req.body.idx,
            limit: 6,
        });
        for (let i = 0; i < productlist.length; i++) {
            if (productlist[i].img) {
                const splimg = productlist[i].img.split(",");
                productlist[i].dataValues.image = splimg;
            }
        }
        const nowcate = yield models_1.Category.findOne({
            attributes: ["name"],
            where: { id: req.params.id },
        });
        res.json({ product: productlist, nowcate: nowcate });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
