"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../config/utils");
function authorize(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({
            message: "Incorrect credentials"
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, utils_1.JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(403).json({
            message: "Incorrect credentials"
        });
        return;
    }
}
