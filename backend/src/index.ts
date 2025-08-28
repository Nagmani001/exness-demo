import express from "express";
import { userRouter } from "./router/userRouter";
import { klineRouter } from "./router/klineRouter";


const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/kline", klineRouter);




app.listen(3000, () => {
  console.log("server is running on port 3000");
})
