"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Store_1 = __importDefault(require("./Store"));
class PointHistory extends sequelize_1.Model {
    static initialize(sequelize) {
        PointHistory.init({
            point: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            history: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "PointHistory",
            tableName: "point_history",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        PointHistory.belongsTo(Store_1.default, {
            as: "Store",
            foreignKey: "storeId",
        });
    }
}
exports.default = PointHistory;
