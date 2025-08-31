import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/utils";

export function authorize(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({
      message: "Incorrect credentials"
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: "Incorrect credentials"
    });
    return;

  }




}
