"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const zodTypes_1 = require("../types/zodTypes");
const utils_1 = require("../config/utils");
const zod_1 = require("zod");
const __1 = require("..");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post("/", (req, res) => {
    const userId = req.userId;
    const parsedData = zodTypes_1.orderWithoutLeverageSchema.safeParse(req.body);
    if (!parsedData.data) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }
    const user = utils_1.IN_MEMORY_USER.find(x => {
        if (x.id == userId) {
            return x;
        }
    });
    if (!user) {
        return;
    }
    const { asset, quantity, takeProfit, stopLoss, type } = parsedData.data;
    if (asset == "ETH") {
    }
    else {
    }
    if (parsedData.data.type == "Buy") {
        const existingBalance = user.balance["USD"];
        if (existingBalance < parsedData.data.quantity * __1.latestPrice[parsedData.data.asset].sellPrice) {
            res.status(403).json({
                message: "not enough balance",
            });
            return;
        }
        const orderId = (0, zod_1.uuidv4)();
        user.balance["USD"] -= parsedData.data.quantity * __1.latestPrice[parsedData.data.asset].sellPrice;
        utils_1.OPEN_ORDER.push({
            id: orderId,
            userID: userId,
            quantity: parsedData.data.quantity,
            asset: parsedData.data.asset,
            price: __1.latestPrice[parsedData.data.asset].sellPrice,
            type: "Buy"
        });
        if (parsedData.data.takeProfit && parsedData.data.stopLoss) {
            //TODO: make sure to liquidate the user when at the stoploss and take profit mark
        }
        res.json({
            orderId,
        });
    }
    else {
        const userAsset = user.balance[parsedData.data.asset];
        if (userAsset >= parsedData.data.quantity) {
            user.balance[parsedData.data.asset] -= parsedData.data.quantity;
            const id = (0, zod_1.uuidv4)();
            utils_1.OPEN_ORDER.push({
                id,
                userID: userId,
                quantity: parsedData.data.quantity,
                asset: parsedData.data.asset,
                price: __1.latestPrice[parsedData.data.asset].buyPrice,
                type: "Sell"
            });
        }
        else {
            const priceForSell = __1.latestPrice[parsedData.data.asset].buyPrice * parsedData.data.quantity;
            if (user.balance["USD"] < priceForSell) {
                res.status(403).json({
                    message: "not enough balance",
                });
                return;
            }
            user.balance["USD"] -= __1.latestPrice[parsedData.data.asset].buyPrice * parsedData.data.quantity;
            const id = (0, zod_1.uuidv4)();
            utils_1.OPEN_ORDER.push({
                id,
                userID: userId,
                quantity: parsedData.data.quantity,
                asset: parsedData.data.asset,
                price: __1.latestPrice[parsedData.data.asset].buyPrice,
                type: "Sell"
            });
            res.json({
                orderId: id,
            });
            //TODO: make sure to liquidate the user when he bears a loss of 1x of his sell price
        }
    }
});
exports.orderRouter.get("/open", (req, res) => {
    const userId = req.userId;
    const openOrders = utils_1.OPEN_ORDER.map(x => {
        if (x.userID == userId && !x.pnl) {
            return x;
        }
    });
    res.json({
        trades: openOrders
    });
});
exports.orderRouter.get("/", (req, res) => {
    const userId = req.userId;
    const closedOrders = utils_1.OPEN_ORDER.map(x => {
        if (x.userID == userId && x.pnl) {
            return x;
        }
    });
    res.json({
        trades: closedOrders
    });
});
