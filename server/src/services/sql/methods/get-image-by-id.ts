import cloudsql from "services/sql/database-adaptor";
import StatusCode from "http-status";
import { StatusError } from "models/status-error";
import { PoolClient, QueryResult } from "pg";
import { tableMap } from "models/constants";
import { Image } from "models/objs/image";

/**
 * Image save funtion
 * @param value 
 */
export function getImageById(value: number) {
  const rawStatement: string = `SELECT * FROM ${tableMap.IMAGES} WHERE id = image_id`;

  const statement = rawStatement
    .replace("image_id", `${value}`);

  console.log("Running", statement);
  return cloudsql.connect()
    .then((client: PoolClient) => {
      console.log(`got client [${client.eventNames}]`);
      return new Promise<any>((resolve, reject) => {
        client.query(statement, (err: Error, results: QueryResult) => {
          console.log(`Done with query [${err}] [${results}]`);
          client.release();
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
      })
    })
    .then((results: QueryResult) => {
      console.log(`got results [${results}]`);
      const { rows } = results;
      if (rows.length <= 0) {
        const error = new StatusError(`image with id [${value}] not found`);
        error.status = StatusCode.NOT_FOUND;
        throw error;
      }
      const result = new Image().fromDB(rows[0]);
      return new Image(result);
    })
    .catch((err: Error) => {
      console.error(`ERROR in get-image-by-id:`, err.message);
      throw err;
    });
}
