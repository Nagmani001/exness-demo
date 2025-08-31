import { createClient } from "redis";
import { Client } from "pg";


const pgclient = new Client({
  user: 'your_user',
  host: 'localhost',
  database: 'my_database',
  password: 'your_password',
  port: 5432,
});
// pgclient.connect();

async function main() {
  console.log("client connected");
  const redis = await createClient().connect();
  console.log("redis connected");

  //TODO: add batch inserts
  //  const arr = [];

  while (true) {
    let length = await redis.lLen("price");
    if (length >= 100) {
      const pop = await redis.rPop("price");
      if (!pop) {
        return;
      }
      const parsedPop = JSON.parse(pop);

      //TODO: add batch inserts
      //     arr.push(pop);

      const query = 'INSERT INTO tata_prices (time, price) VALUES ($1, $2)';
      const values = [parsedPop.time, parsedPop.price];
      await pgclient.query(query, values);



    }
  }



}
main();
