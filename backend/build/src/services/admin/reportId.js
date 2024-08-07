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
        const selectreport = req.params.id;
        const nowadmin = yield models_1.Store.findOne({
            where: { id: reqbody.user.id },
        });
        const delreport = yield models_1.Report.findOne({
            where: { id: selectreport },
        });
        /// 누가 삭제했는지 확인할수있게
        yield (nowadmin === null || nowadmin === void 0 ? void 0 : nowadmin.addReport(delreport));
        delreport === null || delreport === void 0 ? void 0 : delreport.destroy();
        res.json({ result: "ok" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ result: "fail" });
    }
});
