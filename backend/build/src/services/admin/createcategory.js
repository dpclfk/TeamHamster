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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield models_1.sequelize.transaction();
    try {
        const reqbody = req.body;
        console.log(reqbody);
        /// 상위 카테고리
        const selectprecate = reqbody.precate;
        if (!reqbody.name) {
            throw Error("err");
        }
        const newcategory = yield models_1.Category.create({
            name: reqbody.name,
        }, { transaction });
        yield transaction.commit();
        if (selectprecate) {
            const precate = yield models_1.Category.findOne({
                where: { id: selectprecate },
                attributes: ["id", "name"],
            });
            if (precate) {
                yield precate.addChildren(newcategory);
            }
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        res.status(500).json({ result: "fail" });
    }
});
