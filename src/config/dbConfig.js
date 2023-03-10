const { Pool } = require("pg");
require("dotenv").config();

const conString = `postgre://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : conString,
});

module.exports = pool;
