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
    try {
        const selectproduct = req.params.id;
        let useraddress = yield models_1.Address.findOne({
            attributes: ["address"],
            include: [
                {
                    model: models_1.ExtraAddress,
                    as: "ExtraAddress",
                    attributes: ["id"],
                    include: [
                        {
                            model: models_1.Product,
                            as: "PurchaseAddress",
                            attributes: ["id"],
                            where: { id: selectproduct },
                        },
                    ],
                },
            ],
        });
        const PurchaseAddress = useraddress === null || useraddress === void 0 ? void 0 : useraddress.address;
        res.json({ PurchaseAddress: PurchaseAddress });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
