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
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const redis_1 = require("redis");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const clients = new Set();
        try {
            const redis = yield (0, redis_1.createClient)().connect();
            console.log("redis connected");
            const wss = new ws_1.WebSocketServer({ port: 8080 });
            console.log("websocket server created");
            try {
                yield redis.subscribe("exness_bid_ask", (data) => {
                    clients.forEach(client => {
                        client.send(JSON.stringify(data));
                    });
                });
            }
            catch (err) {
                console.log("error subscribing pub sub ");
                console.log(err);
            }
            wss.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
                clients.add(socket);
                console.log("client connected");
            }));
        }
        catch (err) {
            console.log("error connecting to redis");
            console.log(err);
        }
    });
}
main();
