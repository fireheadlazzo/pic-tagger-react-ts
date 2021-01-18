import StatusCode from "http-status";
import { databaseAdaptor } from "services/sql/database-adaptor";
import { StatusError } from "models/status-error";
import { QueryResult } from "pg";
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
  return databaseAdaptor.getRunner(statement, [])
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
