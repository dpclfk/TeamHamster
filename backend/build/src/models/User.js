"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Store_1 = __importDefault(require("./Store"));
const Name_1 = __importDefault(require("./Name"));
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        User.init({
            email: {
                type: sequelize_1.DataTypes.STRING(100),
                unique: true,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING(128),
            },
            mobile: {
                type: sequelize_1.DataTypes.STRING(11),
                defaultValue: "01012345678",
            },
            delivery: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            admin: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            superAdmin: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            Oauth: {
                type: sequelize_1.DataTypes.STRING(3),
                defaultValue: "햄스터",
            },
        }, {
            sequelize,
            modelName: "User",
            tableName: "user",
            timestamps: true,
            underscored: true,
            paranoid: true,
        });
    }
    static associate({}) {
        User.hasOne(Store_1.default, {
            as: "Store",
            foreignKey: "userId",
        });
        User.belongsTo(Name_1.default, {
            as: "Name",
            foreignKey: "nameId",
        });
    }
}
exports.default = User;
