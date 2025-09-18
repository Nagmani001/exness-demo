import { Client } from "pg";
import { Router, Request, Response } from "express";

const pgClient = new Client({
  host: "localhost",
  port: 5432,
  user: "nagmani",
  password: "nagmani",
  database: "postgres"
});

export const klineRouter = Router();
pgClient.connect();


klineRouter.get("/", async (req: Request, res: Response) => {
  const { interval, startTime, endTime, market } = req.query;

  let query;

  if (market === "btc_usdt") {

    switch (interval) {
      case '1m':
        query = `SELECT * FROM btc_klines_1m WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      case '1h':
        query = `SELECT * FROM btc_klines_1h WHERE  bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      case '1w':
        query = `SELECT * FROM btc_klines_1w WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      default:
        return res.status(400).send('Invalid interval');
    }
    try {
      const result = await pgClient.query(query, [new Date(Number(startTime)), new Date(Number(endTime))]);
      console.log(result);
      res.json(result.rows.map(x => {
        return {
          open: x.open,
          close: x.close,
          high: x.high,
          low: x.low,
          time: x.bucket,
          decimal: 4
        }
      }));
    } catch (err) {
      console.log(err);
    }

  } else if (market === "eth_usdt") {

    switch (interval) {
      case '1m':
        query = `SELECT * FROM eth_klines_1m WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      case '1h':
        query = `SELECT * FROM eth_klines_1h WHERE  bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      case '1w':
        query = `SELECT * FROM eth_klines_1w WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      default:
        return res.status(400).send('Invalid interval');
    }

    try {
      const result = await pgClient.query(query, [new Date(Number(startTime)), new Date(Number(endTime))]);
      console.log(result);
      res.json(result.rows.map(x => {
        return {
          open: x.open,
          close: x.close,
          high: x.high,
          low: x.low,
          time: x.bucket,
          decimal: 4
        }
      }));
    } catch (err) {
      console.log(err);
    }
  } else if (market === "sol_usdt") {

    switch (interval) {
      case '1m':
        query = `SELECT * FROM sol_klines_1m WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      case '1h':
        query = `SELECT * FROM sol_klines_1h WHERE  bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      case '1w':
        query = `SELECT * FROM sol_klines_1w WHERE bucket >= $1 AND bucket <= $2 ORDER BY bucket ASC`;
        break;
      default:
        return res.status(400).send('Invalid interval');
    }

    try {
      const result = await pgClient.query(query, [new Date(Number(startTime)), new Date(Number(endTime))]);
      console.log(result);
      res.json(result.rows.map(x => {
        return {
          open: x.open,
          close: x.close,
          high: x.high,
          low: x.low,
          time: x.bucket,
          decimal: 4
        }
      }));
    } catch (err) {
      console.log(err);
    }
  }
})
