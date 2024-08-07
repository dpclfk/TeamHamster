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
    const transaction = yield models_1.sequelize.transaction();
    try {
        const reqbody = req.body;
        if (!reqbody.user) {
            throw Error("not login");
        }
        if (!reqbody.name || !reqbody.address || !reqbody.mobile) {
            throw Error("not name OR address OR mobile");
        }
        const nowuser = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        const name = yield models_1.Name.findOne({
            where: { name: reqbody.name },
        });
        const address = yield models_1.Address.findOne({
            where: { address: reqbody.address },
        });
        const nowmobile = reqbody.mobile.replaceAll("-", "");
        const extraaddress = yield models_1.ExtraAddress.create({
            detailAddress: reqbody.detailaddress,
            mobile: nowmobile,
        }, { transaction });
        if (nowuser) {
            yield transaction.commit();
            yield nowuser.addExtraAddress(extraaddress);
        }
        else {
            throw Error("not find user");
        }
        if (name) {
            yield name.addExtraAddress(extraaddress);
        }
        else {
            const newname = yield models_1.Name.create({
                name: reqbody.name,
            });
            yield newname.addExtraAddress(extraaddress);
        }
        if (address) {
            yield address.addExtraAddress(extraaddress);
        }
        else {
            const newaddress = yield models_1.Address.create({
                address: reqbody.address,
            });
            yield newaddress.addExtraAddress(extraaddress);
        }
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        yield transaction.rollback();
        if (err.message == "not login") {
            res.status(400).json({ result: "not login" });
        }
        else if (err.message == "not find user") {
            res.status(400).json({ result: "not find user" });
        }
        else if (err.message == "not name OR address OR mobile") {
            res.status(400).json({ result: "not name OR address OR mobile" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
