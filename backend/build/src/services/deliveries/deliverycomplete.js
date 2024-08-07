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
        const selectproduct = req.params.id;
        const complete = yield models_1.Product.findOne({
            where: { id: selectproduct, itemState: "픽업 완료" },
        });
        if (!complete) {
            throw Error("err");
        }
        yield complete.update({ itemState: "배송 완료" });
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        res.json({ result: "fail" });
    }
});
