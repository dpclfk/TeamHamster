"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Product_1 = __importDefault(require("./Product"));
class DeliveryCost extends sequelize_1.Model {
    static initialize(sequelize) {
        DeliveryCost.init({
            cost: {
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            sequelize,
            modelName: "DeliveryCost",
            tableName: "delivery_cost",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        DeliveryCost.hasMany(Product_1.default, {
            as: "Product",
            foreignKey: "deliveryCostId",
        });
    }
}
exports.default = DeliveryCost;
