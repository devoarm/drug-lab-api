import knex, { Knex } from 'knex';

import dotenv from "dotenv";
dotenv.config();

const dbRcm:Knex = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_RCM_HOST,
    port: 3306,
    user: process.env.DB_RCM_USER,
    password: process.env.DB_RCM_PASS,
    database: process.env.DB_RCM_NAME,
  },
  pool: {
    min: 0,
    max: 30,
    afterCreate: (conn: any, done: any) => {
      conn.query("SET NAMES utf8mb4", (err: any) => {
        done(err, conn);
      });
    },
  },
});

export default dbRcm;
