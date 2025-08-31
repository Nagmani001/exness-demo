import { Router, Request, Response } from "express";


export const orderWithLeverage = Router();



orderWithLeverage.post("/", (req: Request, res: Response) => {

  const { asset, type, margin, leverage } = req.body;
  if (!asset || !type || !margin || !leverage) {
    res.status(411).json({
      message: "Incorrect Inputs"
    });
  }

});
