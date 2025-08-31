"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./router/userRouter");
const klineRouter_1 = require("./router/klineRouter");
const orderRouter_1 = require("./router/orderRouter");
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", userRouter_1.userRouter);
app.use("/api/v1/trade", authMiddleware_1.authorize, orderRouter_1.orderRouter);
app.use("/api/v1/kline", klineRouter_1.klineRouter);
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
