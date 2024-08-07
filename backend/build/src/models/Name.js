"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ExtraAddress_1 = __importDefault(require("./ExtraAddress"));
const User_1 = __importDefault(require("./User"));
class Name extends sequelize_1.Model {
    static initialize(sequelize) {
        Name.init({
            name: {
                type: sequelize_1.DataTypes.STRING(4),
                unique: true,
            },
        }, {
            sequelize,
            modelName: "Name",
            tableName: "name",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        Name.hasMany(ExtraAddress_1.default, {
            as: "ExtraAddress",
            foreignKey: "nameId",
        });
        Name.hasMany(User_1.default, {
            as: "User",
            foreignKey: "nameId",
        });
    }
}
exports.default = Name;
