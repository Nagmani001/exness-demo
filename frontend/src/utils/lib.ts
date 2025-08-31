import axios from "axios";
import type { UTCTimestamp } from "lightweight-charts";

export const BASE_URL = "http://localhost:3000/api/v1";

let lastCandle: any = null;
export async function generateData(interval: string, startTime: Number, endTime: Number, market: string) {

  try {
    const response = await axios.get(`${BASE_URL}/kline/?interval=${interval}&market=${market}&startTime=${startTime}&endTime=${endTime}`);
    const newArr = response.data.map((x: any) => {
      return {
        open: x.open,
        high: x.high,
        low: x.low,
        close: x.close,
        time: new Date(x.time).getTime() / 1000
      }
    });
    console.log("response", response.data);

    /*
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "subscribe",
        symbol: "btcusdt_bid_ask"
      }));

      ws.onmessage = (data: any) => {
        console.log(data);
      }
    }
     */
    return newArr
  } catch (err) {
    console.log(err);
  }
}

export function processRealUpdate(trade: any) {
  const price = trade.bid;
  const timeInSecond = Math.floor(trade.time / 1000);

  const currentBucket = Math.floor(timeInSecond / 60000) * 60000 as UTCTimestamp;

  if (!lastCandle || currentBucket > (lastCandle.time as UTCTimestamp)) {
    lastCandle = {
      time: currentBucket,
      open: price,
      high: price,
      low: price,
      close: price
    }
  } else {
    lastCandle = {
      time: lastCandle.time,
      open: lastCandle.open,
      high: Math.max(lastCandle.high, price),
      low: Math.min(lastCandle.low, price),
      close: price,
    };
  }
  return lastCandle;
}

