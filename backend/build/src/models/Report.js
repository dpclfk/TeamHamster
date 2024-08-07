"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Store_1 = __importDefault(require("./Store"));
const Product_1 = __importDefault(require("./Product"));
class Report extends sequelize_1.Model {
    static initialize(sequelize) {
        Report.init({
            reportText: {
                type: sequelize_1.DataTypes.STRING(500),
            },
        }, {
            sequelize,
            modelName: "Report",
            tableName: "report",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Report.belongsTo(Product_1.default, {
            as: "Product",
            foreignKey: "productId",
        });
        Report.belongsTo(Store_1.default, {
            as: "Store",
            foreignKey: "adminId",
        });
    }
}
exports.default = Report;
