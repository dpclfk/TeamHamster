"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Product_1 = __importDefault(require("./Product"));
class Category extends sequelize_1.Model {
    static initialize(sequelize) {
        Category.init({
            name: {
                type: sequelize_1.DataTypes.STRING(100),
            },
            preCateId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            sequelize,
            modelName: "Category",
            tableName: "category",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Category.hasMany(Category, {
            as: "Children",
            foreignKey: "preCateId",
        });
        Category.belongsTo(Category, {
            as: "Parent",
            foreignKey: "preCateId",
        });
        Category.hasMany(Product_1.default, {
            as: "Product",
            foreignKey: "categoryId",
        });
    }
}
exports.default = Category;
