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
    user: 'your_user',
    host: 'localhost',
    database: 'my_database',
    password: 'your_password',
    port: 5432,
});
// pgclient.connect();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("client connected");
        const redis = yield (0, redis_1.createClient)().connect();
        console.log("redis connected");
        const arr = [];
        while (true) {
            let length = yield redis.lLen("price");
            if (length >= 100) {
                const pop = yield redis.rPop("price");
                arr.push(pop);
            }
            if (arr.length > 100) {
                console.log(arr);
            }
        }
    });
}
main();
