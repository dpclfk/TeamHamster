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
        const nowstoreid = req.query.id;
        const star = yield (0, review_1.default)(nowstoreid);
        const reviewlist = yield models_1.Review.findAll({
            attributes: ["star", "reviewContent"],
            include: [
                { model: models_1.Store, as: "Store", attributes: ["nick", "profileimg"] },
                { model: models_1.Product, as: "Product", attributes: ["title"], where: { sellId: nowstoreid } },
            ],
        });
        const preductcount = yield models_1.Product.count({
            where: { sellId: nowstoreid },
        });
        const reviewcount = yield models_1.Review.count({
            include: [{ model: models_1.Product, as: "Product", where: { sellId: nowstoreid } }],
        });
        const reviewpercent = Math.floor((reviewcount / preductcount) * 100);
        res.json({
            reviewCount: reviewcount,
            reviewAverage: { star: star },
            reviewPercent: reviewpercent,
            reviewlist: reviewlist,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
