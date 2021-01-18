import config from "config";
import { Pool, PoolClient, QueryResult } from "pg";

let pool: Pool;
let connected: boolean = false;

function isConnected() {
  return connected;
}

function connect() {
  pool = new Pool({
    max: config.get("SQL_CONNECTION_LIMIT"),
    user: config.get("SQL_USER"),
    host: config.get("SQL_HOST"),
    password: config.get("SQL_PASSWORD"),
    database: config.get("SQL_DATABASE"),
    port: config.get("SQL_PORT"),
  });
  connected = !!pool;
  return pool;
}

function disconnect() {
  return new Promise((resolve, reject) => {
    pool.end(() => {
      connected = false;
      resolve(connected);
    });
  })
}

function getPool() {
  if(!connected) {
    connect();
  }
  return pool;
}

function getConnection() {
  return getPool().connect();
}

function getRunner(statement: string, values: any[]): Promise<QueryResult> {
  return getConnection().then((client: PoolClient) => {
    return new Promise<any>((resolve, reject) => {
      client.query(statement, values, (err: Error, results: QueryResult) => {
        client.release();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
  })
}

function init() {
  pool = connect();
}

init();

export const databaseAdaptor = {
  isConnected,
  getRunner,
  disconnect,
  getPool,
  getConnection,
}