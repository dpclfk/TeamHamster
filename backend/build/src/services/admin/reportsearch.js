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
        const searchnick = req.body.nick;
        const reportlist = yield models_1.Report.findAll({
            attributes: ["id", "reportText"],
            include: [
                {
                    model: models_1.Product,
                    as: "Product",
                    attributes: ["id"],
                    include: [
                        {
                            model: models_1.Store,
                            as: "Sell",
                            attributes: ["nick"],
                            where: { nick: { [sequelize_1.Op.like]: `%${searchnick}%` } },
                        },
                    ],
                },
            ],
        });
        res.json({ report: reportlist });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
