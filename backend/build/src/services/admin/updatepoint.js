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
const mongoDB_1 = require("../../models/mongoDB");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        yield mongoDB_1.point.create({
            // userId: reqbody.user.id,
            pointPercent: reqbody.point,
        });
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        if (err.message == "point precent") {
            res.status(400).json({ result: "spoint precent" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
