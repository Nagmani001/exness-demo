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
exports.klineRouter = void 0;
const pg_1 = require("pg");
const express_1 = require("express");
const pgClient = new pg_1.Client({
    host: "localhost",
    port: 5432,
    user: "nagmani",
    password: "nagmani",
    database: "postgres"
});
exports.klineRouter = (0, express_1.Router)();
pgClient.connect();
exports.klineRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { interval, startTime, endTime, market } = req.query;
    let query;
    if (market === "btc_usdt") {
        switch (interval) {
            case '1m':
                query = `SELECT * FROM btc_klines_1m WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            case '1h':
                query = `SELECT * FROM btc_klines_1h WHERE  bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            case '1w':
                query = `SELECT * FROM btc_klines_1w WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            default:
                return res.status(400).send('Invalid interval');
        }
        try {
            const result = yield pgClient.query(query, [new Date(Number(startTime)), new Date(Number(endTime))]);
            console.log(result);
            res.json(result.rows.map(x => {
                return {
                    open: x.open,
                    close: x.close,
                    high: x.high,
                    low: x.low,
                    time: x.bucket,
                    decimal: 4
                };
            }));
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (market === "eth_usdt") {
        switch (interval) {
            case '1m':
                query = `SELECT * FROM eth_klines_1m WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            case '1h':
                query = `SELECT * FROM eth_klines_1h WHERE  bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            case '1w':
                query = `SELECT * FROM eth_klines_1w WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            default:
                return res.status(400).send('Invalid interval');
        }
        try {
            const result = yield pgClient.query(query, [new Date(Number(startTime)), new Date(Number(endTime))]);
            console.log(result);
            res.json(result.rows.map(x => {
                return {
                    open: x.open,
                    close: x.close,
                    high: x.high,
                    low: x.low,
                    time: x.bucket,
                    decimal: 4
                };
            }));
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (market === "sol_usdt") {
        switch (interval) {
            case '1m':
                query = `SELECT * FROM sol_klines_1m WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            case '1h':
                query = `SELECT * FROM sol_klines_1h WHERE  bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            case '1w':
                query = `SELECT * FROM sol_klines_1w WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
                break;
            default:
                return res.status(400).send('Invalid interval');
        }
        try {
            const result = yield pgClient.query(query, [new Date(Number(startTime)), new Date(Number(endTime))]);
            console.log(result);
            res.json(result.rows.map(x => {
                return {
                    open: x.open,
                    close: x.close,
                    high: x.high,
                    low: x.low,
                    time: x.bucket,
                    decimal: 4
                };
            }));
        }
        catch (err) {
            console.log(err);
        }
    }
}));
