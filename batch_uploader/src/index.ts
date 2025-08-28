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
  const arr = [];

  while (true) {
    let length = await redis.lLen("price");
    if (length >= 100) {
      const pop = await redis.rPop("price");
      arr.push(pop);




    }
    if (arr.length > 100) {
      console.log(arr);
    }
  }

}
main();
