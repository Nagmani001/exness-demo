"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const utils_1 = require("../config/utils");
const zodTypes_1 = require("../types/zodTypes");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (req, res) => {
    const parsedData = zodTypes_1.credentialsSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({
            message: "error while signing up"
        });
        return;
    }
    utils_1.IN_MEMORY_USER.forEach(x => {
        if (parsedData.data.email == x.email) {
            res.status(403).json({
                message: "error while signing up"
            });
            return;
        }
    });
    const id = (0, uuid_1.v4)();
    utils_1.IN_MEMORY_USER.push({
        id,
        email: parsedData.data.email,
        password: parsedData.data.password,
        balance: {
            "USD": 50000000
        }
    });
    res.json({
        id
    });
});
exports.userRouter.post("/signin", (req, res) => {
    const parsedData = zodTypes_1.credentialsSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({
            message: "invalid data"
        });
        return;
    }
    const user = utils_1.IN_MEMORY_USER.find(x => {
        if (x.email == parsedData.data.email && x.password == parsedData.data.password) {
            return x;
        }
    });
    if (!user) {
        res.json({
            message: "Incorrect credentials",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.JWT_SECRET);
    res.json({
        token,
    });
});
