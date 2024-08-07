"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Store_1 = __importDefault(require("./Store"));
const Product_1 = __importDefault(require("./Product"));
const Address_1 = __importDefault(require("./Address"));
const Name_1 = __importDefault(require("./Name"));
class ExtraAddress extends sequelize_1.Model {
    static initialize(sequelize) {
        ExtraAddress.init({
            mobile: {
                type: sequelize_1.DataTypes.STRING(11),
                allowNull: false,
            },
            detailAddress: {
                type: sequelize_1.DataTypes.STRING(200),
            },
        }, {
            sequelize,
            modelName: "ExtraAddress",
            tableName: "extra_address",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        ExtraAddress.belongsTo(Store_1.default, {
            as: "Store",
            foreignKey: "storeId",
        });
        ExtraAddress.belongsTo(Address_1.default, {
            as: "Address",
            foreignKey: "addressId",
        });
        ExtraAddress.belongsTo(Name_1.default, {
            as: "Name",
            foreignKey: "nameId",
        });
        ExtraAddress.hasMany(Product_1.default, {
            as: "SellAddress",
            foreignKey: "sellAddressId",
        });
        ExtraAddress.hasMany(Product_1.default, {
            as: "PurchaseAddress",
            foreignKey: "purchaseAddressId",
        });
    }
}
exports.default = ExtraAddress;
