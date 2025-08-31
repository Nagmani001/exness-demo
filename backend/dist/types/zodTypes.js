"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderWithoutLeverageSchema = exports.credentialsSchema = void 0;
const zod_1 = require("zod");
exports.credentialsSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
exports.orderWithoutLeverageSchema = zod_1.z.object({
    type: zod_1.z.enum(["Buy", "Sell"]),
    asset: zod_1.z.string(),
    quantity: zod_1.z.number(),
    takeProfit: zod_1.z.number().optional(),
    stopLoss: zod_1.z.number().optional(),
});
/*
export const orderWithLeverageSchema = z.object({
  type: z.enum(["Buy", "Sell"]),
  asset: z.string(),
  quantity: z.number(),
  takeProfit: z.number().optional(),
  stopLoss: z.number().optional(),
});
 */
/*
interface Order {
  id: string,
  userID: string
  type: "Buy" | "Sell",
  asset: string,
  price: number,
  quantity: number
}
 */
