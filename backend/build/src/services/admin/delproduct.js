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
    try {
        const selectreport = req.params.id;
        const delproduct = yield models_1.Product.findOne({
            where: { id: selectreport },
            include: [{ model: models_1.Store, as: "Sell" }],
        });
        if (!delproduct) {
            throw Error("not find product");
        }
        const reportuser = yield models_1.Store.findOne({
            where: { id: delproduct.dataValues.Sell.id },
        });
        if (!reportuser) {
            throw Error("not find user");
        }
        const reportpoint = reportuser.report_point;
        yield reportuser.update({ report_point: reportpoint + 1 });
        delproduct.destroy();
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not find product") {
            res.status(400).json({ result: "not find product" });
        }
        else if (err.message == "not find user") {
            res.status(400).json({ result: "not find user" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
