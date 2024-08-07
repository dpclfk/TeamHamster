"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Category_1 = __importDefault(require("./Category"));
const Store_1 = __importDefault(require("./Store"));
const Review_1 = __importDefault(require("./Review"));
const Report_1 = __importDefault(require("./Report"));
const DeliveryCost_1 = __importDefault(require("./DeliveryCost"));
const ExtraAddress_1 = __importDefault(require("./ExtraAddress"));
class Product extends sequelize_1.Model {
    static initialize(sequelize) {
        Product.init({
            title: {
                type: sequelize_1.DataTypes.STRING(48),
                allowNull: false,
            },
            discription: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            itemState: {
                type: sequelize_1.DataTypes.STRING(5),
                defaultValue: "판매중",
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            img: {
                type: sequelize_1.DataTypes.TEXT,
                defaultValue: "hamster.png",
            },
            delivery: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            userCheck: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: "Product",
            tableName: "product",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Product.hasMany(Review_1.default, {
            as: "Review",
            foreignKey: "productId",
        });
        Product.hasMany(Report_1.default, {
            as: "Report",
            foreignKey: "productId",
        });
        Product.belongsTo(Category_1.default, {
            as: "Category",
            foreignKey: "categoryId",
        });
        Product.belongsTo(Store_1.default, {
            as: "Sell",
            foreignKey: "sellId",
        });
        Product.belongsTo(Store_1.default, {
            as: "Purchase",
            foreignKey: "purchaseId",
        });
        Product.belongsTo(DeliveryCost_1.default, {
            as: "DeliveryCost",
            foreignKey: "deliveryCostId",
        });
        Product.belongsTo(ExtraAddress_1.default, {
            as: "SellAddress",
            foreignKey: "sellAddressId",
        });
        Product.belongsTo(ExtraAddress_1.default, {
            as: "PurchaseAddress",
            foreignKey: "purchaseAddressId",
        });
    }
}
exports.default = Product;
