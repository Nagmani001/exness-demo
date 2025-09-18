import express from "express";
import { createClient } from "redis";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import { klineRouter } from "./router/klineRouter";
import { orderRouter } from "./router/orderRouter";
import { authorize } from "./middleware/authMiddleware";
import { orderWithLeverage } from "./router/orderWithLeverage";
import { assetRouter } from "./router/assetRouter";
import { executeOrderRouter } from "./router/executeOrderRouter";

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
const app = express();

export const latestPrice: Record<string, { buyPrice: number, sellPrice: number }> = {};


app.use(express.json());
app.use(cors());


app.use("/api/v1/assets", assetRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/kline", klineRouter);


app.use("/api/v1/trade", authorize, orderRouter);
app.use("/api/v1/trade/leverage", authorize, orderWithLeverage);
app.use("/api/v1/executeOrder", executeOrderRouter);






async function main() {
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });

  const redis = await createClient().connect();
  redis.subscribe("btcusdt_bid_ask", (data) => {
    const parsedDatat = JSON.parse(data);
    latestPrice[parsedDatat.symbol] = { buyPrice: parsedDatat.buyPrice, sellPrice: parsedDatat.sellPrice };
  });

  redis.subscribe("ethusdt_bid_ask", (data) => {
    const parsedDatat = JSON.parse(data);
    latestPrice[parsedDatat.symbol] = { buyPrice: parsedDatat.buyPrice, sellPrice: parsedDatat.sellPrice };
  });

  redis.subscribe("solusdt_bid_ask", (data) => {
    const parsedDatat = JSON.parse(data);
    latestPrice[parsedDatat.symbol] = { buyPrice: parsedDatat.buyPrice, sellPrice: parsedDatat.sellPrice };
  });
}

main();
