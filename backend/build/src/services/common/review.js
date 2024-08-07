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
exports.default = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield models_1.Store.findAll({
            where: { id: id },
            attributes: [[models_1.sequelize.fn("avg", models_1.sequelize.col("Sell->Review.star")), "star"]],
            include: [
                {
                    model: models_1.Product,
                    as: "Sell",
                    attributes: [],
                    include: [
                        {
                            model: models_1.Review,
                            as: "Review",
                            attributes: [],
                        },
                    ],
                },
            ],
            group: ["Store.id"],
            raw: true,
        });
        const star = Math.floor(review[0].star * 10) / 10;
        return star;
    }
    catch (err) {
        console.error(err);
    }
});
