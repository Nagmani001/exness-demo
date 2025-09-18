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
const ws_1 = __importDefault(require("ws"));
const redis_1 = require("redis");
const DECIMAL = 10000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redis = yield (0, redis_1.createClient)().connect();
            console.log("connected to redis");
            const ws = new ws_1.default("wss://stream.binance.com:9443/ws");
            ws.on("open", () => {
                ws.send(JSON.stringify({
                    method: "SUBSCRIBE",
                    params: [
                        "btcusdt@aggTrade",
                        "solusdt@aggTrade",
                        "ethusdt@aggTrade",
                    ],
                    id: 1
                }));
            });
            ws.on("message", (data) => {
                const message = JSON.parse(data);
                if (message.s == "BTCUSDT") {
                    const realPrice = parseFloat(message.p);
                    const buyPrice = Math.round(realPrice * DECIMAL + ((1 / 100) * realPrice * DECIMAL));
                    const sellPrice = Math.round(realPrice * DECIMAL);
                    const dataToPubsub = {
                        buyPrice,
                        sellPrice,
                        symbol: message.s,
                        time: message.T,
                    };
                    const dataToQueue = {
                        price: sellPrice,
                        time: message.E
                    };
                    redis.publish("btcusdt_bid_ask", JSON.stringify(dataToPubsub));
                    redis.lPush("btcusdt_price", JSON.stringify(dataToQueue));
                }
                else if (message.s == "ETHUSDT") {
                    const realPrice = parseFloat(message.p);
                    const buyPrice = Math.round(realPrice * DECIMAL + ((1 / 100) * realPrice * DECIMAL));
                    const sellPrice = Math.round(realPrice * DECIMAL);
                    const dataToPubsub = {
                        buyPrice,
                        sellPrice,
                        symbol: message.s,
                        time: message.T,
                    };
                    const dataToQueue = {
                        price: sellPrice,
                        time: message.E
                    };
                    redis.publish("ethusdt_bid_ask", JSON.stringify(dataToPubsub));
                    redis.lPush("ethusdt_price", JSON.stringify(dataToQueue));
                }
                else if (message.s == "SOLUSDT") {
                    const realPrice = parseFloat(message.p);
                    const buyPrice = Math.round(realPrice * DECIMAL + ((1 / 100) * realPrice * DECIMAL));
                    const sellPrice = Math.round(realPrice * DECIMAL);
                    const dataToPubsub = {
                        buyPrice,
                        sellPrice,
                        symbol: message.s,
                        time: message.T,
                    };
                    const dataToQueue = {
                        price: sellPrice,
                        time: message.E
                    };
                    redis.publish("solusdt_bid_ask", JSON.stringify(dataToPubsub));
                    redis.lPush("solusdt_price", JSON.stringify(dataToQueue));
                }
            });
            ws.on("error", () => {
                console.log("error occurd");
            });
            ws.on("close", () => {
                console.log("connection closed");
            });
        }
        catch (err) {
            console.log("connection to redis failed");
            console.log(err);
        }
    });
}
main();
