import StatusCode from "http-status";
import { databaseAdaptor } from "services/sql/database-adaptor";
import { StatusError } from "models/status-error";
import { QueryResult } from "pg";
import { tableMap } from "models/constants";
import { Image } from "models/objs/image";
import { QueryOptions } from "models/objs/query-options";

/**
 * Image list funtion
 * @param value 
 */
export function listImages(options: QueryOptions) {
  const rawStatement: string = `SELECT * FROM ${tableMap.IMAGES} WHERE deleted_at IS NULL ORDER BY ${options.orderBy} ${options.ascending ? "ASC" : "DESC"} OFFSET ${options.offset} LIMIT ${options.limit};`;

  console.log("Running", rawStatement);
  return databaseAdaptor.getRunner(rawStatement, [])
    .then((results: QueryResult) => {
      const { rows } = results;
      if (rows.length <= 0) {
        const error = new StatusError(`image not found`);
        error.status = StatusCode.NOT_FOUND;
        throw error;
      }
      return rows.map((row: any) => {
        return new Image(row);
      })
    })
    .catch((err: Error) => {
      console.error(`ERROR in list-images:`, err.message);
      throw err;
    });
}
