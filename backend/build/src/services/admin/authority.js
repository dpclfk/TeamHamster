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
        const reqbody = req.body;
        const nowuser = reqbody.id;
        if (!nowuser) {
            throw Error("err");
        }
        const usedata = yield models_1.User.findOne({
            where: { Oauth: "햄스터" },
            include: { model: models_1.Store, as: "Store", where: { id: nowuser } },
        });
        if ((usedata === null || usedata === void 0 ? void 0 : usedata.id) == 1) {
            throw Error("not change first user");
        }
        let authoritysuperadmin = reqbody.superadmin;
        let authorityadmin = reqbody.admin;
        let authoritydelivery = reqbody.delivery;
        // 프론트 오류 방지
        if (!authoritysuperadmin) {
            authoritysuperadmin = false;
        }
        else {
            authorityadmin = true;
        }
        // 프론트 오류 방지
        if (!authorityadmin) {
            authorityadmin = false;
            authoritysuperadmin = false;
        }
        if (!authoritydelivery) {
            authoritydelivery = false;
        }
        yield (usedata === null || usedata === void 0 ? void 0 : usedata.update({
            superAdmin: authoritysuperadmin,
            admin: authorityadmin,
            delivery: authoritydelivery,
        }));
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        res.json({ result: "fail" });
    }
});
