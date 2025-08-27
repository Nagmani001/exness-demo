import { WebSocketServer } from 'ws';
import { createClient } from "redis";


async function main() {
  try {
    const redis = await createClient().connect();

    const wss = new WebSocketServer({ port: 8080 });
    redis.subscribe("adsf", () => {

    });
    wss.on("connection", (sokcet) => {
      console.log("client connected");

      sokcet.on("message", (data) => {

      });
    });

  } catch (err) {
    console.log("error connecting to redis");
    console.log(err);
  }

}

main();



