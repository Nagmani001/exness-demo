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
const redis_1 = require("redis");
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3002 });
const connections = new Map();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = yield (0, redis_1.createClient)().connect();
    console.log("connected");
    wss.on('connection', (ws) => {
        connections.set(ws, new Set());
        ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const message = JSON.parse(data.toString());
                if (message.type === 'subscribe' && message.symbol) {
                    const symbol = message.symbol.toLowerCase();
                    const channelName = "trades";
                    const clientSymbols = connections.get(ws);
                    if (clientSymbols) {
                        // Check if ANY client is already subscribed to this symbol (not just this client)
                        const isSymbolAlreadySubscribed = Array.from(connections.values())
                            .some(symbols => symbols.has(symbol));
                        // Add symbol to this client's subscription set
                        clientSymbols.add(symbol);
                        // Only subscribe to Redis if no other client is subscribed to this symbol
                        if (!isSymbolAlreadySubscribed) {
                            yield subscriber.subscribe(channelName, (tradeData) => {
                                // Broadcast to ALL clients subscribed to this symbol
                                connections.forEach((clientSymbols, client) => {
                                    if (clientSymbols.has(symbol) && client.readyState === ws_1.WebSocket.OPEN) {
                                        client.send(JSON.stringify({
                                            type: 'trade',
                                            symbol: symbol,
                                            data: JSON.parse(tradeData)
                                        }));
                                    }
                                });
                                console.log("Data passed to websocket ->", tradeData);
                            });
                            console.log(Subscribed, to, Redis, channel, $, { channelName });
                        }
                        // Always send confirmation to the requesting client
                        ws.send(JSON.stringify({
                            type: 'subscribed',
                            symbol: symbol
                        }));
                        console.log(Client, subscribed, to, $, { symbol });
                    }
                }
            }
            catch (error) {
                console.error('Error processing message:', error);
            }
        }));
        ws.on('close', () => {
            console.log('Client disconnected');
            connections.delete(ws);
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            connections.delete(ws);
        });
    });
});
startServer().catch(console.error);
