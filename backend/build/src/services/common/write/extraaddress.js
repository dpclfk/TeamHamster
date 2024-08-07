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
        const reqbody = req.body;
        if (!reqbody.user) {
            throw Error("not login");
        }
        const address = yield models_1.ExtraAddress.findAll({
            where: { storeId: reqbody.user.id },
            attributes: ["id", "mobile", "detailAddress"],
            include: [
                { model: models_1.Address, as: "Address", attributes: ["address"] },
                { model: models_1.Name, as: "Name", attributes: ["name"] },
            ],
        });
        res.json({ extraAddress: address });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else {
            res.json({ result: "fail" });
        }
    }
});
