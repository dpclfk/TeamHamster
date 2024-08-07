"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Product_1 = __importDefault(require("./Product"));
const PointHistory_1 = __importDefault(require("./PointHistory"));
const Review_1 = __importDefault(require("./Review"));
const ExtraAddress_1 = __importDefault(require("./ExtraAddress"));
const Report_1 = __importDefault(require("./Report"));
class Store extends sequelize_1.Model {
    static initialize(sequelize) {
        Store.init({
            nick: {
                type: sequelize_1.DataTypes.STRING(100),
                unique: true,
                allowNull: false,
            },
            point: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
            },
            introduction: {
                type: sequelize_1.DataTypes.STRING(500),
            },
            report_point: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
            },
            mobile: {
                type: sequelize_1.DataTypes.STRING(11),
            },
            block: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            profileimg: {
                type: sequelize_1.DataTypes.TEXT,
                defaultValue: "hamster.png",
            },
        }, {
            sequelize,
            modelName: "Store",
            tableName: "store",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Store.belongsTo(User_1.default, {
            as: "User",
            foreignKey: "userId",
        });
        Store.hasMany(Product_1.default, {
            as: "Sell",
            foreignKey: "sellId",
        });
        Store.hasMany(Product_1.default, {
            as: "Purchase",
            foreignKey: "purchaseId",
        });
        Store.hasMany(PointHistory_1.default, {
            as: "PointHistory",
            foreignKey: "storeId",
        });
        Store.hasMany(Review_1.default, {
            as: "Review",
            foreignKey: "storeId",
        });
        Store.hasMany(ExtraAddress_1.default, {
            as: "ExtraAddress",
            foreignKey: "storeId",
        });
        Store.hasMany(Report_1.default, {
            as: "Report",
            foreignKey: "adminId",
        });
    }
}
exports.default = Store;
