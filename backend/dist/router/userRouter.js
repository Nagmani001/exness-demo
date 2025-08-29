"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const utils_1 = require("./config/utils");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (req, res) => {
    utils_1.IN_MEMORY.forEach(x => {
        if (x.email == req.body.email) {
            res.json({
                msg: "user already exists",
            });
            return;
        }
    });
    utils_1.IN_MEMORY.push({
        email: req.body.email,
        password: req.body.password,
        balance: {
            usd: {
                qty: "5000"
            }
        }
    });
    res.json({
        msg: "user created"
    });
});
exports.userRouter.post("/signin", (req, res) => {
});
