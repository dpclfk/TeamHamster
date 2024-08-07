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
const mongoDB_1 = require("../../../models/mongoDB");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield models_1.sequelize.transaction();
    try {
        const reqbody = req.body;
        if (!reqbody.user) {
            throw Error("not login");
        }
        const nowuser = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        if (nowuser === null || nowuser === void 0 ? void 0 : nowuser.block) {
            throw Error("block");
        }
        const category = reqbody.categoryId;
        const extraAddress = reqbody.extraAddressId;
        if (!category || !extraAddress) {
            throw Error("not category OR deliveryCost OR extraAddress");
        }
        const nowcategory = yield models_1.Category.findOne({
            where: { id: category },
        });
        const nowextraAddress = yield models_1.ExtraAddress.findOne({
            where: { id: extraAddress },
        });
        const productdiscription = reqbody.discription;
        const banword = yield mongoDB_1.bankeyword.find({}, { word: 1, _id: 0 });
        for (let i = 0; i < banword.length; i++) {
            if (productdiscription.indexOf(banword[i].word) > -1) {
                throw Error("bankeyword");
            }
        }
        const write = yield models_1.Product.create({
            title: reqbody.title,
            discription: reqbody.discription,
            price: reqbody.price,
            img: reqbody.img,
        }, { transaction });
        if (nowcategory && nowextraAddress && nowuser) {
            yield transaction.commit();
            yield nowcategory.addProduct(write);
            yield nowextraAddress.addSellAddress(write);
            yield nowuser.addSell(write);
        }
        else {
            throw Error("not category OR deliveryCost OR extraAddress");
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else if (err.message == "not category OR deliveryCost OR extraAddress") {
            res.status(400).json({ result: "not category OR deliveryCost OR extraAddress" });
        }
        else if (err.message == "bankeyword") {
            res.status(400).json({ result: "bankeyword" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
