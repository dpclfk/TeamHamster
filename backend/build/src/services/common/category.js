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
const sequelize_1 = require("sequelize");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        let cate = reqbody.category;
        // where에 undefined가 들어가면 오류뜸
        if (!cate) {
            throw Error("err");
        }
        let categorylist = yield models_1.Category.findOne({
            where: { name: { [sequelize_1.Op.like]: `%${cate}%` } },
            attributes: ["id", "name"],
            include: [{ model: models_1.Category, as: "Children", attributes: ["id", "name"] }],
        });
        res.json({ category: categorylist });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
