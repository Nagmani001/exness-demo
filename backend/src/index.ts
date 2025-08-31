import express from "express";
import { createClient } from "redis";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import { klineRouter } from "./router/klineRouter";
import { orderRouter } from "./router/orderRouter";
import { authorize } from "./middleware/authMiddleware";

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
const app = express();

export const latestPrice: Record<string, { bid: number, ask: number }> = {};

// {"bid":106519.5712,"ask":"108693.44000000","symbol":"BTCUSDT","time":1756625307507}

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/trade", authorize, orderRouter);

app.use("/api/v1/kline", klineRouter);





async function main() {
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });

  const redis = await createClient().connect();
  redis.subscribe("price", (data) => {
    const parsedDatat = JSON.parse(data);
    latestPrice[parsedDatat.symbol] = { bid: parsedDatat.bid, ask: parsedDatat.ask };
  });
}

main();
