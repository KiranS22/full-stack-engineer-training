const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "ecom_db",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

module.exports =  pool
