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
const mongoDB_1 = require("../../../models/mongoDB");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        if (!reqbody.user) {
            throw Error("not loged in");
        }
        const nowuser = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        const pointpercent = yield mongoDB_1.point.findOne({}, { pointPercent: 1, _id: 0 }).sort({ _id: -1 });
        if (!(pointpercent === null || pointpercent === void 0 ? void 0 : pointpercent.pointPercent)) {
            throw Error("err");
        }
        // 포인트 충전량 관련
        // const chargepoint = (reqbody.pointvalue / 1000) * pointpercent?.pointPercent;
        const chargepoint = reqbody.pointvalue;
        yield (nowuser === null || nowuser === void 0 ? void 0 : nowuser.update({
            point: reqbody.user.point + chargepoint,
        }));
        const pointhistory = yield models_1.PointHistory.create({
            point: reqbody.pointvalue,
            history: reqbody.history,
        });
        yield (nowuser === null || nowuser === void 0 ? void 0 : nowuser.addPointHistory(pointhistory));
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        if (err.message == "not loged in") {
            res.status(400).json({ result: "not loged in" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
