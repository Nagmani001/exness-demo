"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const zodTypes_1 = require("../types/zodTypes");
const utils_1 = require("../config/utils");
const zod_1 = require("zod");
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
    if (parsedData.data.type == "Buy") {
        const user = utils_1.IN_MEMORY_USER.find(x => {
            if (x.id == userId) {
                return x;
            }
        });
        if (!user) {
            return;
        }
        const existingBalance = user.balance["USD"];
        // to chekc if user has enough ablance to place order
        // make connection to pub sub to get realtime price of asset
        if (existingBalance <= parsedData.data.quantity * 3) {
        }
        const orderId = (0, zod_1.uuidv4)();
        user.balance["USD"] -= parsedData.data.quantity * 23;
        utils_1.OPEN_ORDER.push({
            id: orderId,
            userID: userId,
            quantity: parsedData.data.quantity,
            asset: parsedData.data.asset,
            price: 23,
            type: "Buy"
        });
        res.json({
            orderId,
        });
    }
    else {
    }
});
