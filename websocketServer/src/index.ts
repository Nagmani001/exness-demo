import { WebSocketServer } from 'ws';
import { createClient } from "redis";


async function main() {
  const clients = new Set<WebSocket>();
  try {
    const redis = await createClient().connect();
    console.log("redis connected");

    const wss = new WebSocketServer({ port: 8080 });
    console.log("websocket server created");

    try {
      await redis.subscribe("exness_bid_ask", (data) => {
        clients.forEach(client => {
          client.send(JSON.stringify(data));
        })
      });

    } catch (err) {
      console.log("error subscribing pub sub ");
      console.log(err);

    }

    wss.on("connection", async (socket: WebSocket) => {
      clients.add(socket);
      console.log("client connected");
    });


  } catch (err) {
    console.log("error connecting to redis");
    console.log(err);
  }

}

main();



