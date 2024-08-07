"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ExtraAddress_1 = __importDefault(require("./ExtraAddress"));
class Address extends sequelize_1.Model {
    static initialize(sequelize) {
        Address.init({
            address: {
                type: sequelize_1.DataTypes.STRING(200),
                unique: true,
            },
        }, {
            sequelize,
            modelName: "Address",
            tableName: "address",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Address.hasMany(ExtraAddress_1.default, {
            as: "ExtraAddress",
            foreignKey: "addressId",
        });
    }
}
exports.default = Address;
