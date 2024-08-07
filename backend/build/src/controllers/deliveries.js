"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pickup_1 = __importDefault(require("../services/deliveries/pickup"));
const pickupId_1 = __importDefault(require("../services/deliveries/pickupId"));
const pickuplist_1 = __importDefault(require("../services/deliveries/pickuplist"));
const pickscan_1 = __importDefault(require("../services/deliveries/pickscan"));
const deliverycheck_1 = __importDefault(require("../services/deliveries/deliverycheck"));
const deliverycomplete_1 = __importDefault(require("../services/deliveries/deliverycomplete"));
const nowspot_1 = __importDefault(require("../services/deliveries/nowspot"));
const router = (0, express_1.Router)();
router.use(deliverycheck_1.default);
router.post("/pickup", pickup_1.default); // 픽업대기인 리스트 보여줌
router.post("/pickupId", pickupId_1.default); // 선택한 상품을 픽업중으로 바꿔줌
router.post("/pickuplist", pickuplist_1.default); // 현재 픽업중인 상품 리스트를 보여줌
router.post("/pickscan/:id", pickscan_1.default); // 특정 상품을 픽업완료로 바꿔줌
router.post("/deliverycomplete/:id", deliverycomplete_1.default); // 특정 상품을 배송완료로 바꿔줌
router.post("/nowspot", nowspot_1.default); // 특정 상품을 배송완료로 바꿔줌
exports.default = router;
