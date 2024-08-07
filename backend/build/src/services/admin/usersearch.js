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
const sequelize_1 = require("sequelize");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqbody = req.body;
        const searchuser = reqbody.nick;
        const userlist = yield models_1.Store.findAll({
            attributes: [
                "id",
                "nick",
                [models_1.sequelize.col("User.admin"), "admin"],
                [models_1.sequelize.col("User.super_admin"), "superAdmin"],
                [models_1.sequelize.col("User.delivery"), "delivery"],
            ],
            where: { nick: { [sequelize_1.Op.like]: `%${searchuser}%` } },
            include: { model: models_1.User, as: "User", attributes: [] },
        });
        res.json({ userlist: userlist });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
