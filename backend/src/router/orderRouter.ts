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

  const user = IN_MEMORY_USER.find(x => {
    if (x.id == userId) {
      return x;
    }
  });

  if (!user) {
    return;
  }

  const { asset, quantity, takeProfit, stopLoss, type } = parsedData.data;

  if (asset == "ETH") {

  } else {

  }

  if (parsedData.data.type == "Buy") {
    const existingBalance = user.balance["USD"];

    if (existingBalance < parsedData.data.quantity * latestPrice[parsedData.data.asset].sellPrice) {
      res.status(403).json({
        message: "not enough balance",
      });
      return;
    }

    const orderId = uuidv4();

    user.balance["USD"] -= parsedData.data.quantity * latestPrice[parsedData.data.asset].sellPrice;

    OPEN_ORDER.push({
      id: orderId,
      userID: userId,
      quantity: parsedData.data.quantity,
      asset: parsedData.data.asset,
      price: latestPrice[parsedData.data.asset].sellPrice,
      type: "Buy"
    });


    if (parsedData.data.takeProfit && parsedData.data.stopLoss) {
      //TODO: make sure to liquidate the user when at the stoploss and take profit mark
    }


    res.json({
      orderId,
    });
  } else {
    const userAsset = user.balance[parsedData.data.asset];
    if (userAsset >= parsedData.data.quantity) {
      user.balance[parsedData.data.asset] -= parsedData.data.quantity;
      const id = uuidv4();
      OPEN_ORDER.push({
        id,
        userID: userId,
        quantity: parsedData.data.quantity,
        asset: parsedData.data.asset,
        price: latestPrice[parsedData.data.asset].buyPrice,
        type: "Sell"
      });
    } else {
      const priceForSell = latestPrice[parsedData.data.asset].buyPrice * parsedData.data.quantity;
      if (user.balance["USD"] < priceForSell) {
        res.status(403).json({
          message: "not enough balance",
        });
        return;
      }
      user.balance["USD"] -= latestPrice[parsedData.data.asset].buyPrice * parsedData.data.quantity;
      const id = uuidv4();
      OPEN_ORDER.push({
        id,
        userID: userId,
        quantity: parsedData.data.quantity,
        asset: parsedData.data.asset,
        price: latestPrice[parsedData.data.asset].buyPrice,
        type: "Sell"
      });
      res.json({
        orderId: id,
      });
      //TODO: make sure to liquidate the user when he bears a loss of 1x of his sell price
    }
  }
});


orderRouter.get("/open", (req: Request, res: Response) => {
  const userId = req.userId;
  const openOrders = OPEN_ORDER.map(x => {
    if (x.userID == userId && !x.pnl) {
      return x;
    }
  });
  res.json({
    trades: openOrders
  });
});


orderRouter.get("/", (req: Request, res: Response) => {
  const userId = req.userId;
  const closedOrders = OPEN_ORDER.map(x => {
    if (x.userID == userId && x.pnl) {
      return x;
    }
  });

  res.json({
    trades: closedOrders
  });
});
