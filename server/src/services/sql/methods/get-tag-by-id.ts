import StatusCode from "http-status";
import { databaseAdaptor } from "services/sql/database-adaptor";
import { StatusError } from "models/status-error";
import { QueryResult } from "pg";
import { tableMap } from "models/constants";
import { Tag } from "models/objs/tag";

/**
 * Tag save funtion
 * @param value 
 */
export function getTagById(value: number) {
  const rawStatement: string = `SELECT * FROM ${tableMap.TAGS} WHERE id = tag_id`;

  const statement = rawStatement
    .replace("tag_id", `${value}`);

  console.log("Running", statement);
  return databaseAdaptor.getRunner(statement, [])
    .then((results: QueryResult) => {
      const { rows } = results;
      if (rows.length <= 0) {
        const error = new StatusError(`tag with id [${value}] not found`);
        error.status = StatusCode.NOT_FOUND;
        throw error;
      }
      const result = new Tag().fromDB(rows[0]);
      return new Tag(result);
    })
    .catch((err: Error) => {
      console.error(`ERROR in get-tag-by-id:`, err.message);
      throw err;
    });
}
