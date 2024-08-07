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
        console.log(req.body);
        let productlist = yield models_1.Product.findAll({
            where: { itemState: "판매중" },
            attributes: ["id", "title", "discription", "price", "createdAt", "img"],
            include: [{ model: models_1.Category, as: "Category", attributes: ["name"] }],
            offset: req.body.idx,
            limit: 6,
        });
        for (let i = 0; i < productlist.length; i++) {
            if (productlist[i].img) {
                const splimg = productlist[i].img.split(",");
                productlist[i].dataValues.image = splimg;
            }
        }
        res.json({ product: productlist });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
