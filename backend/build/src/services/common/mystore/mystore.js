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
        const reqbody = req.body;
        const nowstoreid = req.query.id;
        let loginuser = false;
        const store = yield models_1.Store.findOne({
            where: { id: nowstoreid },
            attributes: [
                "id",
                "nick",
                "point",
                "Introduction",
                "profileimg",
                [models_1.sequelize.fn("count", models_1.sequelize.col("Sell.id")), "sellCount"],
            ],
            include: [
                {
                    model: models_1.Product,
                    as: "Sell",
                    attributes: [],
                },
            ],
        });
        if (store) {
            const star = yield (0, review_1.default)(store.id);
            store.dataValues.star = { star: star };
        }
        if (!reqbody.user) {
        }
        else if (reqbody.user.id == (store === null || store === void 0 ? void 0 : store.id)) {
            loginuser = true;
        }
        res.json({ store: store, loginuser: loginuser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
