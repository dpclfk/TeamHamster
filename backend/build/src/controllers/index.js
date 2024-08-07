"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/// 테스트용 코드 위치, 테스트할때 주석해제만 해서 쓰게
// import dbtest from "../services/test/dbtest";
// import sessiontest from "../services/test/sessiontest";
// import review from "../services/common/review";
// import testtwo from "../services/test/testtwo";
///
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
/// 로그인 확인 및 권한 확인
const logincheck_1 = __importDefault(require("../services/common/logincheck"));
const deliveries_1 = __importDefault(require("./deliveries"));
const admin_1 = __importDefault(require("./admin"));
const adminlogin_1 = __importDefault(require("../services/admin/adminlogin"));
const deliverylogin_1 = __importDefault(require("../services/deliveries/deliverylogin"));
/// 상단 레이아웃
const layout_1 = __importDefault(require("../services/common/layout"));
/// 이미지 저장
const imgSave_1 = __importDefault(require("../services/common/imgSave"));
/// page
const main_1 = __importDefault(require("../services/common/page/main"));
const catepage_1 = __importDefault(require("../services/common/page/catepage"));
const product_1 = __importDefault(require("../services/common/page/product"));
const search_1 = __importDefault(require("../services/common/page/search"));
const arrayId_1 = __importDefault(require("../services/common/page/arrayId"));
/// write
const extraaddress_1 = __importDefault(require("../services/common/write/extraaddress"));
const addaddress_1 = __importDefault(require("../services/common/write/addaddress"));
const productwrite_1 = __importDefault(require("../services/common/write/productwrite"));
/// 카테고리 관련
const category_1 = __importDefault(require("../services/common/category"));
const catefirst_1 = __importDefault(require("../services/common/catefirst"));
const catelist_1 = __importDefault(require("../services/common/catelist"));
const catelistthird_1 = __importDefault(require("../services/common/catelistthird"));
/// view
const purchase_1 = __importDefault(require("../services/common/view/purchase"));
const report_1 = __importDefault(require("../services/common/view/report"));
/// mystore
const mystore_1 = __importDefault(require("../services/common/mystore/mystore"));
const mysell_1 = __importDefault(require("../services/common/mystore/mysell"));
const mypurchase_1 = __importDefault(require("../services/common/mystore/mypurchase"));
const myreview_1 = __importDefault(require("../services/common/mystore/myreview"));
const GpsRiderGet_1 = __importDefault(require("../services/common/mystore/GpsRiderGet"));
const GpsUserGet_1 = __importDefault(require("../services/common/mystore/GpsUserGet"));
const reviewWrite_1 = __importDefault(require("../services/common/mystore/reviewWrite"));
const myStoreNameSet_1 = __importDefault(require("../services/common/mystore/myStoreNameSet"));
const myStoreContentSet_1 = __importDefault(require("../services/common/mystore/myStoreContentSet"));
const myStoreProfileImg_1 = __importDefault(require("../services/common/mystore/myStoreProfileImg"));
const point_1 = __importDefault(require("../services/common/mystore/point"));
const purchaseCheck_1 = __importDefault(require("../services/common/mystore/purchaseCheck"));
/// user
const regist_1 = __importDefault(require("../services/common/user/regist"));
const login_1 = __importDefault(require("../services/common/user/login"));
const logout_1 = __importDefault(require("../services/common/user/logout"));
const findemail_1 = __importDefault(require("../services/common/user/findemail"));
const findpw_1 = __importDefault(require("../services/common/user/findpw"));
const updatepw_1 = __importDefault(require("../services/common/user/updatepw"));
/// user 중 OAuth
const NaverCallback_1 = __importDefault(require("../services/common/user/NaverCallback"));
const GoogleCallback_1 = __importDefault(require("../services/common/user/GoogleCallback"));
const deliverycost_1 = __importDefault(require("../services/common/deliverycost"));
const pointpercent_1 = __importDefault(require("../services/common/pointpercent"));
router.use((0, express_session_1.default)({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION || "test",
    name: "store-session",
    store: new FileStore({
        reapInterval: 60,
        path: "./login-session",
    }),
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
}));
/// 테스트용 코드
// router.get("/dbtest", dbtest);
// router.get("/sessiontest", sessiontest);
// router.post("/review", review);
// router.post("/testtwo", testtwo);
/// 로그인 확인 및 권한 확인
router.use(logincheck_1.default);
router.use("/delivery", deliveries_1.default);
router.use("/admin", admin_1.default);
router.post("/adminlogin", adminlogin_1.default);
router.post("/deliverylogin", deliverylogin_1.default);
/// 상단 레이아웃
router.post("/layout", layout_1.default);
/// 이미지 저장
router.post("/imgSave", imgSave_1.default);
/// page
router.post("/main", main_1.default);
router.post("/category/:id", catepage_1.default);
router.post("/product/:id", product_1.default);
router.post("/search", search_1.default);
router.post("/recent", arrayId_1.default); // 특정 상품번호만 보여주게(최근본 상품)
/// write
router.post("/address", extraaddress_1.default);
router.post("/addaddress", addaddress_1.default);
router.post("/write", productwrite_1.default);
/// 카테고리 관련
router.post("/category", category_1.default);
router.post("/catefirst", catefirst_1.default);
router.post("/catelist/:id", catelist_1.default);
router.post("/catelistthird/:id", catelistthird_1.default);
/// view
router.post("/purchase/:id", purchase_1.default);
router.post("/report/:id", report_1.default);
/// mystore
router.post("/mystore", mystore_1.default);
router.post("/mysell", mysell_1.default);
router.post("/mypurchase", mypurchase_1.default);
router.post("/review", myreview_1.default);
router.post("/GpsRiderGet/:id", GpsRiderGet_1.default);
router.post("/GpsUserGet/:id", GpsUserGet_1.default);
router.post("/reviewWrite/:id", reviewWrite_1.default);
router.post("/myStoreNameSet", myStoreNameSet_1.default);
router.post("/myStoreContentSet", myStoreContentSet_1.default);
router.post("/myStoreProfileImg", myStoreProfileImg_1.default);
router.post("/point", point_1.default);
router.post("/purchaseCheck/:id", purchaseCheck_1.default); /// 구매 확정
/// user
router.post("/regist", regist_1.default);
router.post("/login", login_1.default);
router.post("/logout", logout_1.default);
router.post("/findemail", findemail_1.default);
router.post("/findpw", findpw_1.default);
router.post("/updatepw", updatepw_1.default);
/// user 중 OAuth
router.post("/NaverCallback", NaverCallback_1.default);
router.post("/GoogleCallback", GoogleCallback_1.default);
router.post("/deliverycost", deliverycost_1.default);
router.post("/pointpercent", pointpercent_1.default);
exports.default = router;
