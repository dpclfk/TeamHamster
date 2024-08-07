"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const crypto_1 = __importDefault(require("crypto"));
const controllers_1 = __importDefault(require("./controllers"));
const models_1 = require("./models");
const mongoDB_1 = require("./models/mongoDB");
const basicCate_1 = __importDefault(require("./services/common/basicCate"));
dotenv_1.default.config();
console.log("test1");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)(process.env.COOKIE || "test"));
app.set("port", process.env.PORT || 3080);
app.set("url", process.env.MONGURL || "mongodb://localhost:27017");
models_1.sequelize.sync({ force: false });
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:8000", "http://localhost:8888"],
    credentials: true,
}));
console.log("test2");
app.use("/api/imgs", express_1.default.static("/var/www/backend/uploads"));
app.use("/api", controllers_1.default);
mongoose_1.default.connect(app.get("url"), {
    dbName: "hamster",
});
mongoose_1.default.connection.on("connected", () => {
    console.log("mongoose connection");
});
console.log("test3");
console.log(process.env.KEY);
console.log(process.env.IV);
const basicvalue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield models_1.User.findOne())) {
            mongoose_1.default.connection.dropCollection("deliveries");
            mongoose_1.default.connection.dropCollection("points");
            mongoose_1.default.connection.dropCollection("bankeywords");
            models_1.DeliveryCost.create({ cost: 3000 });
            mongoDB_1.point.create({ pointPercent: 1000 });
            const key = crypto_1.default.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
            const iv = Buffer.from(`${process.env.IV}`, "base64");
            const cipher = crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
            const encryptionemail = cipher.update(`admin1@admin.com`, "utf-8", "hex");
            const encryptionpw = crypto_1.default
                .createHash("sha512")
                .update(`admin11@${process.env.SALT}`)
                .digest("hex");
            const store = yield models_1.Store.create({
                nick: "admin1",
                mobile: "",
                report_point: 10,
            });
            yield models_1.Name.create({
                name: "관리자",
            });
            const newname = yield models_1.Name.findOne({
                where: { name: "관리자" },
            });
            const regist = yield models_1.User.create({
                email: encryptionemail,
                password: encryptionpw,
                superAdmin: true,
                admin: true,
                delivery: true,
            });
            yield (newname === null || newname === void 0 ? void 0 : newname.addUser(regist));
            yield regist.setStore(store);
            (0, basicCate_1.default)();
        }
    }
    catch (err) {
        console.error(err);
    }
});
basicvalue();
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "port server open");
});
