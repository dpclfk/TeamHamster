"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/// 권한 체크
const admincheck_1 = __importDefault(require("../services/admin/admincheck"));
/// 신고 관련
const report_1 = __importDefault(require("../services/admin/report"));
const reportId_1 = __importDefault(require("../services/admin/reportId"));
const reportsearch_1 = __importDefault(require("../services/admin/reportsearch"));
const delproduct_1 = __importDefault(require("../services/admin/delproduct"));
/// 카테고리 생성
const createcategory_1 = __importDefault(require("../services/admin/createcategory"));
/// 밴 유저 관련
const manyreportuser_1 = __importDefault(require("../services/admin/manyreportuser"));
const userblock_1 = __importDefault(require("../services/admin/userblock"));
const userunblock_1 = __importDefault(require("../services/admin/userunblock"));
const userblocksearch_1 = __importDefault(require("../services/admin/userblocksearch"));
/// 포인트 및 배달비 관련
const updatepoint_1 = __importDefault(require("../services/admin/updatepoint"));
const updatedeliverycost_1 = __importDefault(require("../services/admin/updatedeliverycost"));
/// 금지 키워드
const keyword_1 = __importDefault(require("../services/admin/keyword"));
const addkeyword_1 = __importDefault(require("../services/admin/addkeyword"));
const delkeyword_1 = __importDefault(require("../services/admin/delkeyword"));
/// 권한 부여
const authority_1 = __importDefault(require("../services/admin/authority"));
const usersearch_1 = __importDefault(require("../services/admin/usersearch"));
const blockuser_1 = __importDefault(require("../services/admin/blockuser"));
const router = (0, express_1.Router)();
/// 권한 체크
router.use(admincheck_1.default);
/// 신고 관련
router.post("/report", report_1.default);
router.delete("/report/:id", reportId_1.default);
router.post("/reportsearch", reportsearch_1.default);
router.delete("/delproduct/:id", delproduct_1.default);
/// 카테고리 생성
router.post("/createcategory", createcategory_1.default);
/// 밴 유저 관련
router.post("/manyreportuser", manyreportuser_1.default);
router.post("/blockuser", blockuser_1.default);
router.post("/userblock/:id", userblock_1.default);
router.post("/userunblock/:id", userunblock_1.default);
router.post("/userblocksearch", userblocksearch_1.default);
/// 포인트 및 배달비 관련
router.patch("/updatepoint", updatepoint_1.default);
router.patch("/updatedeliverycost", updatedeliverycost_1.default);
/// 금지 키워드
router.post("/keyword", keyword_1.default);
router.post("/addkeyword", addkeyword_1.default);
router.post("/delkeyword", delkeyword_1.default);
/// 권한 부여
router.post("/authority", authority_1.default);
/// 유저 검색
router.post("/usersearch", usersearch_1.default);
exports.default = router;
