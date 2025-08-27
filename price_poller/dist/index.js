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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redis = yield (0, redis_1.createClient)().connect();
            const ws = new ws_1.default("wss://stream.binance.com:9443/ws");
            ws.on("open", () => {
                ws.send(JSON.stringify({
                    method: "SUBSCRIBE",
                    params: [
                        "btcusdt@bookTicker",
                        "btcusdt@aggTrade",
                    ],
                    id: 1
                }));
            });
            ws.on("message", (data) => {
                const message = JSON.parse(data);
                if (message.E) {
                    console.log(message);
                    const dataToSend = {
                        price: message.p,
                        time: message.T
                    };
                    redis.lPush("price", JSON.stringify(dataToSend));
                }
                else {
                    const bid = message.b;
                    const ask = message.a;
                    const exnessBid = bid + ((2.5 / 100) * bid);
                    const exnessAsk = ask - ((2.5 / 100) * bid);
                    const dataToSend = {
                        exnessBid,
                        exnessAsk
                    };
                    redis.publish("exness_bid_ask", JSON.stringify(dataToSend));
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
