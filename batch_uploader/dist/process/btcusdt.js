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
const pg_1 = require("pg");
const pgclient = new pg_1.Client({
    user: 'nagmani',
    host: 'localhost',
    database: "postgres",
    password: 'nagmani',
    port: 5432,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgclient.connect();
        console.log("client connected");
        const redis = yield (0, redis_1.createClient)().connect();
        console.log("redis connected");
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const pop = yield redis.lRange("btcusdt_price", 0, -1);
            redis.del("btcusdt_price");
            let query = `
      INSERT INTO usdtbtc_prices
        (time, price)
      VALUES`;
            let temp = 0;
            pop.forEach((_, i) => {
                if (i == pop.length - 1) {
                    query += ` ($${i + 1 + temp},$${i + 2 + temp})`;
                    temp++;
                }
                else {
                    query += ` ($${i + 1 + temp},$${i + 2 + temp}),`;
                    temp++;
                }
            });
            const values = [];
            pop.forEach((x) => {
                const parsedData = JSON.parse(x);
                values.push(new Date(parsedData.time), parsedData.price);
            });
            try {
                yield pgclient.query(query, values);
                console.log("success");
            }
            catch (err) {
                console.log(err);
                console.log("error occured");
            }
        }), 5000);
    });
}
main();
