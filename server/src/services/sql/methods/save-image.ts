import { databaseAdaptor } from "services/sql/database-adaptor";
import { QueryResult } from "pg";
import { tableMap } from "models/constants";
import { Image } from "models/objs/image";

/**
 * Image save funtion
 * @param value 
 */
// type ISaveObject = Image | Tag;
export function saveImage(value: any) {
  const rawStatement: string = `INSERT INTO ${tableMap.IMAGES} (columns) VALUES (valueNums) RETURNING ${Image.primaryKey}`;
  value = new Image(value).toDB();
  const values: any[] = [];
  const valueNums = Image.columns
    .map((key: string, index: number) => {
      values.push(value[key])
      return `$${index + 1}`;
    });

  const statement = rawStatement
    .replace("columns", Image.columns.join(","))
    .replace("valueNums", valueNums.join(","));

  console.log("Running", statement);
  return databaseAdaptor.getRunner(statement, values)
    .then((results: QueryResult) => {
      const { rows } = results;
      value[Image.primaryKey] = rows[0][Image.primaryKey];
      return value;
    })
    .catch((err: Error) => {
      console.error(`ERROR in save-image:`, err.message);
      throw err;
    });
}
