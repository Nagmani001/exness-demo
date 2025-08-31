import WebSocket from "ws";

import { createClient } from "redis";

async function main() {
  try {
    const redis = await createClient().connect();
    console.log("connected to redis");

    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.on("open", () => {
      ws.send(JSON.stringify({
        method: "SUBSCRIBE",
        params: [
          "btcusdt@aggTrade",
          "solusdt@aggTrade",
          "ethusdt@aggTrade",
        ],
        id: 1
      }));
    });
    ws.on("message", (data: any) => {
      const message = JSON.parse(data);
      if (message.s == "BTCUSDT") {
        const bid = message.p - ((2 / 100) * message.p)
        const ask = message.p;
        const dataToPubsub = {
          bid,
          ask,
          symbol: message.s,
          time: message.T,
        };
        const dataToQueue = {
          price: message.p,
          time: message.E
        }
        redis.publish("btcusdt_bid_ask", JSON.stringify(dataToPubsub));
        redis.lPush("btcusdt_price", JSON.stringify(dataToQueue));
      } else if (message.s == "ETHUSDT") {
        const bid = message.p - ((2 / 100) * message.p)
        const ask = message.p;
        const dataToPubsub = {
          bid,
          ask,
          symbol: message.s,
          time: message.T,
        };
        const dataToQueue = {
          price: message.p,
          time: message.E,
          volume: message.v
        }
        redis.publish("ethusdt_bid_ask", JSON.stringify(dataToPubsub));
        redis.lPush("ethusdt_price", JSON.stringify(dataToQueue));

      } else if (message.s == "SOLUSDT") {
        const bid = message.p - ((2 / 100) * message.p)
        const ask = message.p;
        const dataToPubsub = {
          bid,
          ask,
          symbol: message.s,
          time: message.T,
        };
        const dataToQueue = {
          price: message.p,
          time: message.E
        }
        redis.publish("solusdt_bid_ask", JSON.stringify(dataToPubsub));
        redis.lPush("solusdt_price", JSON.stringify(dataToQueue));
      }
    });
    ws.on("error", () => {
      console.log("error occurd");
    })
    ws.on("close", () => {
      console.log("connection closed");
    });
  } catch (err) {
    console.log("connection to redis failed");
    console.log(err);
  }
}

main();


