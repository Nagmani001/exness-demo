import { createClient } from "redis";
import { Client } from "pg";


const pgclient = new Client({
  user: 'nagmani',
  host: 'localhost',
  database: "postgres",
  password: 'nagmani',
  port: 5432,
});
pgclient.connect();

async function main() {
  console.log("client connected");
  const redis = await createClient().connect();
  console.log("redis connected");

  //TODO: add batch inserts
  //  const arr = [];

  while (true) {
    let length = await redis.lLen("btcusdt_price");
    if (length >= 20) {
      const pop = await redis.rPop("btcusdt_price");
      if (!pop) {
        return;
      }
      const parsedPop = JSON.parse(pop);

      //TODO: add batch inserts
      //     arr.push(pop);

      const query = 'INSERT INTO usdtbtc_prices (time, price) VALUES ($1, $2)';
      const values = [new Date(parsedPop.time), parsedPop.price];
      try {
        await pgclient.query(query, values);
        console.log("pushed");
      } catch (err) {
        console.log("error occured");
        console.log(err);
      }
    }
  }
}
main();
