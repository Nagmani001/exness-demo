import { Router, Request, Response } from "express";
import { latestPrice } from "..";


export const assetRouter = Router();


assetRouter.get("/", (req: Request, res: Response) => {
  // TODO: show which asset does the platform supports
  res.json({
    assets: [{
      name: "Bitcoin",
      symbol: "BTC",
      buyPrice: latestPrice["BTCUSDT"].buyPrice,
      sellPrice: latestPrice["BTCUSDT"].sellPrice,
      decimals: 8,
      imageUrl: "image_url"
    },
    {
      name: "Ethereu",
      symbol: "ETH",
      buyPrice: latestPrice["ETHUSDT"].buyPrice,
      sellPrice: latestPrice["ETHUSDT"].sellPrice,
      decimals: 13,
      imageUrl: "image_url"
    },
    {
      name: "Solana",
      symbol: "SOL",
      buyPrice: latestPrice["SOLUSDT"].buyPrice,
      sellPrice: latestPrice["SOLUSDT"].sellPrice,
      decimals: 8,
      imageUrl: "image_url"
    }]
  });
});
