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
exports.latestPrice = void 0;
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./router/userRouter");
const klineRouter_1 = require("./router/klineRouter");
const orderRouter_1 = require("./router/orderRouter");
const authMiddleware_1 = require("./middleware/authMiddleware");
const orderWithLeverage_1 = require("./router/orderWithLeverage");
const assetRouter_1 = require("./router/assetRouter");
const executeOrderRouter_1 = require("./router/executeOrderRouter");
const app = (0, express_1.default)();
exports.latestPrice = {};
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/assets", assetRouter_1.assetRouter);
app.use("/api/v1/user", userRouter_1.userRouter);
app.use("/api/v1/kline", klineRouter_1.klineRouter);
app.use("/api/v1/trade", authMiddleware_1.authorize, orderRouter_1.orderRouter);
app.use("/api/v1/trade/leverage", authMiddleware_1.authorize, orderWithLeverage_1.orderWithLeverage);
app.use("/api/v1/executeOrder", executeOrderRouter_1.executeOrderRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
        const redis = yield (0, redis_1.createClient)().connect();
        redis.subscribe("btcusdt_bid_ask", (data) => {
            const parsedDatat = JSON.parse(data);
            exports.latestPrice[parsedDatat.symbol] = { buyPrice: parsedDatat.buyPrice, sellPrice: parsedDatat.sellPrice };
        });
        redis.subscribe("ethusdt_bid_ask", (data) => {
            const parsedDatat = JSON.parse(data);
            exports.latestPrice[parsedDatat.symbol] = { buyPrice: parsedDatat.buyPrice, sellPrice: parsedDatat.sellPrice };
        });
        redis.subscribe("solusdt_bid_ask", (data) => {
            const parsedDatat = JSON.parse(data);
            exports.latestPrice[parsedDatat.symbol] = { buyPrice: parsedDatat.buyPrice, sellPrice: parsedDatat.sellPrice };
        });
    });
}
main();
