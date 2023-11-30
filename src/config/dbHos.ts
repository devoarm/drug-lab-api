import knex, { Knex } from 'knex';

import dotenv from "dotenv";
dotenv.config();

const dbHos:Knex = knex({
  client: "mysql2",
  connection: {
    host: process.env.hostHosXp,
    port: 3306,
    user: process.env.userHosXp,
    password: process.env.passwordHosXp,
    database: process.env.databaseHosXp,
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

export default dbHos;
