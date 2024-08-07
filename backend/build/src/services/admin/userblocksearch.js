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
        const searchnick = req.body.nick;
        if (!searchnick) {
            throw Error("search nick");
        }
        const blockuser = yield models_1.Store.findAll({
            where: { block: true, nick: { [sequelize_1.Op.like]: `%${searchnick}%` } },
            attributes: ["id", "nick"],
        });
        res.json({ block: blockuser });
    }
    catch (err) {
        console.error(err);
        if (err.message == "search nick") {
            res.status(400).json({ result: "not search nick" });
        }
        else {
            res.status(500).json({ result: "fail" });
        }
    }
});
