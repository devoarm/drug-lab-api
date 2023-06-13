import knex, { Knex } from 'knex';

import dotenv from "dotenv";
dotenv.config();

const dbWebBlog:Knex = knex({
  client: "mysql2",
  connection: {
    // socketPath : '/tmp/mysql.sock',
    host: '192.168.3.229',
    port: 3306,
    user: 'queue',
    password: 'aranFvg8zjkowfh',
    database: 'frontend',
  },
  pool: {
    min: 0,
    max: 7,
    // afterCreate: (conn: any, done: any) => {
    //   conn.query("SET NAMES utf8mb4", (err: any) => {
    //     done(err, conn);
    //   });
    // },
  },
});

export default dbWebBlog;
