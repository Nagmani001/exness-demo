import { Router, Request, Response } from "express";
import { orderWithoutLeverageSchema } from "../types/zodTypes";
import { IN_MEMORY_USER, OPEN_ORDER } from "../config/utils";
import { uuidv4 } from "zod";
import { latestPrice } from "..";

export const orderRouter = Router();


orderRouter.post("/", (req: Request, res: Response) => {
  const userId = req.userId;
  const parsedData = orderWithoutLeverageSchema.safeParse(req.body);
  if (!parsedData.data) {
    res.status(411).json({
      message: "Incorrect Inputs"
    });
    return;
  }

  if (parsedData.data.type == "Buy") {

    const user = IN_MEMORY_USER.find(x => {
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

    if (existingBalance < parsedData.data.quantity * latestPrice[parsedData.data.asset].ask) {

    }

    const orderId = uuidv4();

    user.balance["USD"] -= parsedData.data.quantity * 23;

    OPEN_ORDER.push({
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

  } else {

  }






});
