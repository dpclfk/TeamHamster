"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankeyword = exports.point = exports.delivery = void 0;
/// 몽고DB 스키마관련
const mongoose_1 = __importStar(require("mongoose"));
const deliveryscham = new mongoose_1.Schema({
    userId: Number,
    productId: Number,
    spotX: Number,
    spotY: Number,
}, {
    timestamps: true,
});
const pointscham = new mongoose_1.Schema({
    pointPercent: Number,
}, {
    timestamps: true,
});
const keywordscham = new mongoose_1.Schema({
    word: { type: String, unique: true },
}, {
    timestamps: true,
});
///
const delivery = mongoose_1.default.model("delivery", deliveryscham);
exports.delivery = delivery;
const point = mongoose_1.default.model("point", pointscham);
exports.point = point;
const bankeyword = mongoose_1.default.model("bankeyword", keywordscham);
exports.bankeyword = bankeyword;
