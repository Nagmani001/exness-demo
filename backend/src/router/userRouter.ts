import { Router, Request, Response } from "express";
import { IN_MEMORY } from "./config/utils";

export const userRouter = Router();


userRouter.post("/signup", (req: Request, res: Response) => {
  IN_MEMORY.forEach(x => {
    if (x.email == req.body.email) {
      res.json({
        msg: "user already exists",
      })
      return;
    }
  });
  IN_MEMORY.push({
    email: req.body.email,
    password: req.body.password,
    balance: {
      usd: {
        qty: "5000"
      }
    }
  });

  res.json({
    msg: "user created"
  });

});

userRouter.post("/signin", (req: Request, res: Response) => {

});
