import { createPool } from "mysql2/promise";
import pg from "pg";
import { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT, DB_USER_PG } from "./config.js";


export const poolMysql = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME
})

export const poolPG = new pg.Pool({

    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER_PG,
    password: DB_PASS,
    max: 5,
    min: 1,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
});

