"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Store_1 = __importDefault(require("./Store"));
const Product_1 = __importDefault(require("./Product"));
class Review extends sequelize_1.Model {
    static initialize(sequelize) {
        Review.init({
            star: {
                type: sequelize_1.DataTypes.TINYINT,
                // defaultValue: 0,
                allowNull: false,
            },
            reviewContent: {
                type: sequelize_1.DataTypes.STRING(500),
            },
        }, {
            sequelize,
            modelName: "Review",
            tableName: "review",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Review.belongsTo(Store_1.default, {
            as: "Store",
            foreignKey: "storeId",
        });
        Review.belongsTo(Product_1.default, {
            as: "Product",
            foreignKey: "productId",
        });
    }
}
exports.default = Review;
