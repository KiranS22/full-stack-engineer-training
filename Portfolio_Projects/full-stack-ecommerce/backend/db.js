const { Pool } = require("pg");
const pool = new Pool({
  user: "jmvvjebn",
  host: process.env.HOST,
  database: "jmvvjebn",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
