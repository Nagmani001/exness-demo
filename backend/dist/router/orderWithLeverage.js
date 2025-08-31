"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderWithLeverage = void 0;
const express_1 = require("express");
exports.orderWithLeverage = (0, express_1.Router)();
exports.orderWithLeverage.post("/", (req, res) => {
    const { asset, type, margin, leverage } = req.body;
    if (!asset || !type || !margin || !leverage) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
    }
});
