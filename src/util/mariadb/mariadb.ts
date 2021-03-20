
import { Pool, PoolConfig, PoolConnection, QueryOptions, createPool } from 'mariadb';
import * as dotenv from "dotenv";
dotenv.config();
const poolConfig: PoolConfig = {
  host: process.env.HOSTDB,
  port: Number(process.env.PORTDB),
  user: process.env.USERDB,
  password: process.env.PASSWORDDB,
  connectionLimit: Number(process.env.CONNECTION_LIMIT),
  database: process.env.DBNAME,
  multipleStatements: true,
};
const pool: Pool = createPool(poolConfig);

export const getPoolConnection = async () => {
  const connection = await pool.getConnection();
  return connection;
};

export const releaseAndCloseConnection = async (conn: PoolConnection) => {
  conn.release();
  const endedConn = await closeConnection(conn);
  return endedConn;
};

export const beginTransaction = async (conn: PoolConnection) => {
  return await conn.beginTransaction();
};

export const commitTransaction = async (conn: PoolConnection) => {
  const connectionCommit = await conn.commit();
  return connectionCommit;
};

export const rollbackTransaction = async (conn: PoolConnection) => {
  const connectionRollback = await conn.rollback();
  return connectionRollback;
};

export const executeQuery = async (conn: PoolConnection, query: string | QueryOptions, queryValues?: any) => {
  const queryResult = queryValues ? await conn.query(query, queryValues) : await conn.query(query);
  delete queryResult.meta;
  return queryResult;
};

export const closeConnection = async (conn: PoolConnection) => {
  const endedConn = await conn.end();
  return endedConn;
};

/* NOT USED RIGHT NOW */
export const getAnswerFromTransaction = async (transaction: Array<any>) => {
  const lastResult = transaction;
  const response: Array<any> | Object = lastResult instanceof Array ? lastResult[0] : lastResult;
  return response;
};

/* NOT USED RIGHT NOW */
export const executeTransaction = async (conn: PoolConnection, queries: Array<any>, queryValues: Array<any>) => {
  let index = 0;
  const queryResults: Array<any> = [];
  await conn.beginTransaction();
  for (index; index < queries.length; index++) {
    queryResults.push(await executeQuery(conn, queries[index], queryValues[index]));
  }
  const response = await getAnswerFromTransaction(queryResults[queryResults.length - 1]);
  return response;
};
