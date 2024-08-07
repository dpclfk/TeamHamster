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
        if (!reqbody.user) {
            throw Error("not login");
        }
        const nowuser = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        if (nowuser === null || nowuser === void 0 ? void 0 : nowuser.block) {
            throw Error("block");
        }
        const nowproid = req.params.id;
        const product = yield models_1.Product.findOne({
            where: { id: nowproid },
        });
        const report = yield models_1.Report.create({
            reportText: reqbody.reporttext,
        }, { transaction });
        if (product) {
            yield transaction.commit();
            yield product.addReport(report);
        }
        else {
            throw Error("notfind product");
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else if (err.message == "notfind product") {
            res.status(400).json({ result: "notfind product" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
