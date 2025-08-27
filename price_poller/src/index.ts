import WebSocket from "ws";

import { createClient } from "redis";

async function main() {
  try {
    const redis = await createClient().connect();

    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.on("open", () => {
      ws.send(JSON.stringify({
        method: "SUBSCRIBE",
        params: [
          "btcusdt@bookTicker",
          "btcusdt@aggTrade",
        ],
        id: 1
      }));
    });
    ws.on("message", (data: any) => {
      const message = JSON.parse(data);

      if (message.E) {
        const dataToSend = {
          price: message.p,
          time: message.T
        }
        redis.lPush("price", JSON.stringify(dataToSend));
      } else {
        const bid = message.b;
        const ask = message.a;

        const exnessBid = bid + ((2.5 / 100) * bid);
        const exnessAsk = ask - ((2.5 / 100) * bid);

        const dataToSend = {
          exnessBid,
          exnessAsk
        };
        redis.publish("exness_bid_ask", JSON.stringify(dataToSend));
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
