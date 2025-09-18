import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { IN_MEMORY_USER, JWT_SECRET } from "../config/utils";
import { credentialsSchema } from "../types/zodTypes";
import { authorize } from "../middleware/authMiddleware";

export const userRouter = Router();

userRouter.post("/signup", (req: Request, res: Response) => {
  const parsedData = credentialsSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "error while signing up"
    });
    return;
  }

  IN_MEMORY_USER.forEach(x => {
    if (parsedData.data.email == x.email) {
      res.status(403).json({
        message: "error while signing up"
      });
      return;
    }
  });

  const id = uuidv4();
  IN_MEMORY_USER.push({
    id,
    email: parsedData.data.email,
    password: parsedData.data.password,
    balance: {
      "USD": 500000
    }
  });
  res.json({
    id
  });

});

userRouter.post("/signin", (req: Request, res: Response) => {
  const parsedData = credentialsSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "invalid data"
    });
    return;
  }

  const user = IN_MEMORY_USER.find(x => {
    if (x.email == parsedData.data.email && x.password == parsedData.data.password) {
      return x;
    }
  });

  if (!user) {
    res.json({
      message: "Incorrect credentials",
    });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({
    token,
  });
});

userRouter.get("/balance", authorize, (req: Request, res: Response) => {
  const userId = req.userId;
  const user = IN_MEMORY_USER.find(x => x.id == userId);
  res.json({
    usd_balance: user?.balance["USD"]
  });
});
