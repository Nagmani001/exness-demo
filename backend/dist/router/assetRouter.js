"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
exports.assetRouter = (0, express_1.Router)();
exports.assetRouter.get("/", (req, res) => {
    // TODO: show which asset does the platform supports
    res.json({
        assets: [{
                name: "Bitcoin",
                symbol: "BTC",
                buyPrice: __1.latestPrice["BTCUSDT"].buyPrice,
                sellPrice: __1.latestPrice["BTCUSDT"].sellPrice,
                decimals: 8,
                imageUrl: "image_url"
            },
            {
                name: "Ethereu",
                symbol: "ETH",
                buyPrice: __1.latestPrice["ETHUSDT"].buyPrice,
                sellPrice: __1.latestPrice["ETHUSDT"].sellPrice,
                decimals: 13,
                imageUrl: "image_url"
            },
            {
                name: "Solana",
                symbol: "SOL",
                buyPrice: __1.latestPrice["SOLUSDT"].buyPrice,
                sellPrice: __1.latestPrice["SOLUSDT"].sellPrice,
                decimals: 8,
                imageUrl: "image_url"
            }]
    });
});
