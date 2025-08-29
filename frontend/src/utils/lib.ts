import axios from "axios";

export const BASE_URL = "http://localhost:3000/api/v1";

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
    return newArr

    /*
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "subscribe",
        symbol: "btcusdt_bid_ask"
      }));

      ws.onmessage = (data: any) => {
        const parsedData = JSON.parse(data);
        console.log(parsedData);

      }

    }
     */

  } catch (err) {
    console.log(err);
  }
}





/*
let randomFactor = 25 + Math.random() * 25;
const samplePoint = (i: any) =>
  i *
  (0.5 +
    Math.sin(i / 1) * 0.2 +
    Math.sin(i / 2) * 0.4 +
    Math.sin(i / randomFactor) * 0.8 +
    Math.sin(i / 50) * 0.5) +
  200 +
  i * 2;
export function generateData(
  numberOfCandles = 500,
  updatesPerCandle = 5,
  startAt = 100
) {
  const createCandle = (val: any, time: any) => ({
    time,
    open: val,
    high: val,
    low: val,
    close: val,
  });

  const updateCandle = (candle: any, val: any) => ({
    time: candle.time,
    close: val,
    open: candle.open,
    low: Math.min(candle.low, val),
    high: Math.max(candle.high, val),
  });

  randomFactor = 25 + Math.random() * 25;
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  const numberOfPoints = numberOfCandles * updatesPerCandle;
  const initialData = [];
  const realtimeUpdates = [];
  let lastCandle;
  let previousValue = samplePoint(-1);
  for (let i = 0; i < numberOfPoints; ++i) {
    if (i % updatesPerCandle === 0) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    const time = date.getTime() / 1000;
    let value = samplePoint(i);
    const diff = (value - previousValue) * Math.random();
    value = previousValue + diff;
    previousValue = value;
    if (i % updatesPerCandle === 0) {
      const candle = createCandle(value, time);
      lastCandle = candle;
      if (i >= startAt) {
        realtimeUpdates.push(candle);
      }
    } else {
      const newCandle = updateCandle(lastCandle, value);
      lastCandle = newCandle;
      if (i >= startAt) {
        realtimeUpdates.push(newCandle);
      } else if ((i + 1) % updatesPerCandle === 0) {
        initialData.push(newCandle);
      }
    }
  }

  return {
    initialData,
    realtimeUpdates,
  };
}
 */

