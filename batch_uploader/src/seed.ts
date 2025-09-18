const { Client } = require('pg');

const client = new Client({
  user: 'nagmani',
  host: 'localhost',
  database: 'postgres',
  password: 'nagmani',
  port: 5432,
});

async function initializeDB() {
  await client.connect();

  // for btc 
  await client.query(`
        DROP TABLE IF EXISTS "usdtbtc_prices";
        CREATE TABLE "usdtbtc_prices"(
            time            TIMESTAMP WITH TIME ZONE NOT NULL,
            price      BIGINT,
            volume      BIGINT,
            currency_code   VARCHAR (10)
        );
        
        SELECT create_hypertable('usdtbtc_prices', 'time', 'price', 2);
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS btc_klines_1m AS
        SELECT
            time_bucket('1 minute', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdtbtc_prices
        GROUP BY bucket, currency_code;
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS btc_klines_1h AS
        SELECT
            time_bucket('1 hour', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdtbtc_prices
        GROUP BY bucket, currency_code;
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS btc_klines_1w AS
        SELECT
            time_bucket('1 week', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdtbtc_prices
        GROUP BY bucket, currency_code;
    `);





  // for eth
  await client.query(`
        DROP TABLE IF EXISTS "usdteth_prices";
        CREATE TABLE "usdteth_prices"(
            time            TIMESTAMP WITH TIME ZONE NOT NULL,
            price      BIGINT,
            volume      BIGINT,
            currency_code   VARCHAR (10)
        );
        
        SELECT create_hypertable('usdteth_prices', 'time', 'price', 2);
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS eth_klines_1m AS
        SELECT
            time_bucket('1 minute', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdteth_prices
        GROUP BY bucket, currency_code;
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS eth_klines_1h AS
        SELECT
            time_bucket('1 hour', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdteth_prices
        GROUP BY bucket, currency_code;
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS eth_klines_1w AS
        SELECT
            time_bucket('1 week', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdteth_prices
        GROUP BY bucket, currency_code;
    `);




  // for sol 
  await client.query(`
        DROP TABLE IF EXISTS "usdtsol_prices";
        CREATE TABLE "usdtsol_prices"(
            time            TIMESTAMP WITH TIME ZONE NOT NULL,
            price      BIGINT,
            volume      BIGINT,
            currency_code   VARCHAR (10)
        );
        
        SELECT create_hypertable('usdtsol_prices', 'time', 'price', 2);
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS sol_klines_1m AS
        SELECT
            time_bucket('1 minute', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdtsol_prices
        GROUP BY bucket, currency_code;
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS sol_klines_1h AS
        SELECT
            time_bucket('1 hour', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdtsol_prices
        GROUP BY bucket, currency_code;
    `);

  await client.query(`
        CREATE MATERIALIZED VIEW IF NOT EXISTS sol_klines_1w AS
        SELECT
            time_bucket('1 week', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM usdtsol_prices
        GROUP BY bucket, currency_code;
    `);



  await client.end();
  console.log("Database initialized successfully");
}

initializeDB().catch(console.error);
