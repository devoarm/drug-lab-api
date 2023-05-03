import knex, { Knex } from 'knex';

import dotenv from "dotenv";
dotenv.config();

const dbOffice:Knex = knex({
  client: "mysql2",
  connection: {
    host: process.env.hostOffice,
    port: 3306,
    user: process.env.userOffice,
    password: process.env.passwordOffice,
    database: process.env.databaseOffice,
  },
  pool: {
    min: 0,
    max: 7,
    afterCreate: (conn: any, done: any) => {
      conn.query("SET NAMES utf8mb4", (err: any) => {
        done(err, conn);
      });
    },
  },
});

export default dbOffice;
