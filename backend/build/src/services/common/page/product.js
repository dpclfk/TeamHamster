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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const review_1 = __importDefault(require("../review"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productlist = yield models_1.Product.findOne({
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
            where: { id: req.params.id },
            include: [
                { model: models_1.Category, as: "Category", attributes: ["name"] },
                { model: models_1.DeliveryCost, as: "DeliveryCost", attributes: ["cost"] },
                {
                    model: models_1.Store,
                    as: "Sell",
                    attributes: ["id", "nick", "profileimg"],
                },
            ],
        });
        if (!productlist) {
            throw Error("not product");
        }
        const star = yield (0, review_1.default)(productlist.dataValues.Sell.id);
        productlist.dataValues.Sell.dataValues.star = { star: star };
        if (productlist.img) {
            const splimg = productlist.img.split(",");
            productlist.dataValues.image = splimg;
        }
        res.json({ product: productlist });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not product") {
            res.status(400).json({ result: "not product" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
