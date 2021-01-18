import { databaseAdaptor } from "services/sql/database-adaptor";
import { QueryResult } from "pg";
import { tableMap } from "models/constants";
import { Tag } from "models/objs/tag";

/**
 * Tag save funtion
 * @param value 
 */
export function saveTag(value: any) {
  const rawStatement: string = `INSERT INTO ${tableMap.TAGS} (columns) VALUES (valueNums) RETURNING ${Tag.primaryKey}`;
  value = new Tag(value).toDB();
  const values: any[] = [];
  const valueNums = Tag.columns
    .map((key: string, index: number) => {
      values.push(value[key])
      return `$${index + 1}`;
    });

  const statement = rawStatement
    .replace("columns", Tag.columns.join(","))
    .replace("valueNums", valueNums.join(","));

  console.log("Running", statement);
  console.log("Values", values);
  return databaseAdaptor.getRunner(statement, values)
    .then((results: QueryResult) => {
      const { rows } = results;
      value[Tag.primaryKey] = rows[0][Tag.primaryKey];
      return value;
    })
    .catch((err: Error) => {
      console.error(`ERROR in save-tag:`, err.message);
      throw err;
    });
}
