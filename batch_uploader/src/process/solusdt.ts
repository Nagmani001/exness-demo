
import { createClient } from "redis";
import { Client } from "pg";


const pgclient = new Client({
  user: 'nagmani',
  host: 'localhost',
  database: "postgres",
  password: 'nagmani',
  port: 5432,
});

async function main() {
  await pgclient.connect();
  console.log("client connected");
  const redis = await createClient().connect();
  console.log("redis connected");


  setInterval(async () => {
    const pop = await redis.lRange("solusdt_price", 0, -1);
    redis.del("solusdt_price");

    let query = `
      INSERT INTO usdtsol_prices
        (time, price)
      VALUES`;

    let temp = 0;

    pop.forEach((_, i: any) => {
      if (i == pop.length - 1) {
        query += ` ($${i + 1 + temp},$${i + 2 + temp})`
        temp++;
      } else {
        query += ` ($${i + 1 + temp},$${i + 2 + temp}),`
        temp++;
      }
    });

    const values: any = [];

    pop.forEach((x: any) => {
      const parsedData = JSON.parse(x);
      values.push(new Date(parsedData.time), parsedData.price);
    });

    try {
      await pgclient.query(query, values);
      console.log("success");
    } catch (err) {
      console.log(err);
      console.log("error occured");
    }

  }, 5000);

}
main();
