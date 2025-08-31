import { WebSocket, WebSocketServer } from 'ws';
import { createClient } from "redis";


const clients = new Map<WebSocket, string>();

async function main() {
  try {
    const redis = await createClient().connect();
    console.log("redis connected");

    const wss = new WebSocketServer({ port: 8080 });
    console.log("websocket server created");

    try {
      await redis.subscribe("btcusdt_bid_ask", (data) => {
        console.log(data);
        clients.forEach((symbol, socket) => {
          if (symbol == "btcusdt_bid_ask") {
            socket.send(JSON.stringify(data));
          }
        })
      });

      await redis.subscribe("ethusdt_bid_ask", (data) => {
        clients.forEach((symbol, socket) => {
          if (symbol == "ethusdt_bid_ask") {
            socket.send(JSON.stringify(data));
          }
        })
      });

      await redis.subscribe("solusdt_bid_ask", (data) => {
        clients.forEach((symbol, socket) => {
          if (symbol == "solusdt_bid_ask") {
            socket.send(JSON.stringify(data));
          }
        })
      });
    } catch (err) {
      console.log("error subscribing pub sub ");
      console.log(err);

    }

    wss.on("connection", async (socket: WebSocket) => {

      socket.on("message", (data: any) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type == "subscribe" && parsedData.symbol === "btcusdt_bid_ask") {
          clients.set(socket, parsedData.symbol);
          console.log(clients.get(socket));
        } else if (parsedData.type == "subscribe" && parsedData.symbol === "ethusdt_bid_ask") {
          clients.set(socket, parsedData.symbol);
          console.log(clients.get(socket));
        }
        else if (parsedData.type == "subscribe" && parsedData.symbol === "solusdt_bid_ask") {
          clients.set(socket, parsedData.symbol);
          console.log(clients.get(socket));
        }


        if (parsedData.type == "unsubscribe" && parsedData.symbol === "btcusdt_bid_ask") {
          clients.delete(socket);
          console.log(clients.get(socket));
        } else if (parsedData.type == "unsubscribe" && parsedData.symbol === "ethusdt_bid_ask") {
          clients.delete(socket);
          console.log(clients.get(socket));
        }
        else if (parsedData.type == "unsubscribe" && parsedData.symbol === "solusdt_bid_ask") {
          clients.delete(socket);
          console.log(clients.get(socket));
        }
      })
    });


  } catch (err) {
    console.log("error connecting to redis");
    console.log(err);
  }

}

main();



