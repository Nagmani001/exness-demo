import { Router, Request, Response } from "express";


export const klineRouter = Router();


klineRouter.get("/", (req: Request, res: Response) => {
  const { interval, startTime, endTime } = req.body;

})
