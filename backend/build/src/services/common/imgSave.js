"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (_req, _file, callback) => {
            callback(null, "/var/www/backend/uploads");
        },
        filename: (_req, file, callback) => {
            file.originalname = Buffer.from(file.originalname, "ascii").toString("utf8");
            const tempName = Date.now() + "_" + file.originalname;
            callback(null, tempName);
        },
    }),
});
exports.default = [
    upload.array("img"),
    (req, res) => {
        console.log(req.files);
        const files = req.files;
        const fileUrls = [];
        files.forEach((item) => {
            // fileUrls.push(`http://localhost:3001/api/imgs/${item.filename}`);
            fileUrls.push(`${item.filename}`);
        });
        res.json({
            uploaded: true,
            url: fileUrls,
        });
    },
];
