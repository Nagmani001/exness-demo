import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const orderWithoutLeverageSchema = z.object({
  type: z.enum(["Buy", "Sell"]),
  asset: z.string(),
  quantity: z.number(),
  takeProfit: z.number().optional(),
  stopLoss: z.number().optional(),
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

