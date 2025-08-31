import { Client } from "pg";

const pgClient = new Client({
  host: "localhost",
  password: "nagmani",
  user: "nagmani",
  database: "postgres",
  port: 5432
});

pgClient.connect();

async function main() {
  await pgClient.query('REFRESH MATERIALIZED VIEW btc_klines_1m');
  await pgClient.query('REFRESH MATERIALIZED VIEW btc_klines_1h');
  await pgClient.query('REFRESH MATERIALIZED VIEW btc_klines_1w');

  await pgClient.query('REFRESH MATERIALIZED VIEW eth_klines_1m');
  await pgClient.query('REFRESH MATERIALIZED VIEW eth_klines_1h');
  await pgClient.query('REFRESH MATERIALIZED VIEW eth_klines_1w');


  await pgClient.query('REFRESH MATERIALIZED VIEW sol_klines_1m');
  await pgClient.query('REFRESH MATERIALIZED VIEW sol_klines_1h');
  await pgClient.query('REFRESH MATERIALIZED VIEW sol_klines_1w');
  console.log("refreshed");
}
setInterval(() => {
  main();
}, 10000);
