import StatusCode from "http-status";
import { databaseAdaptor } from "services/sql/database-adaptor";
import { StatusError } from "models/status-error";
import { QueryResult } from "pg";
import { tableMap } from "models/constants";
import { Image } from "models/objs/image";
import { objToUpdateString } from "../utils";

/**
 * Image list funtion
 * @param value 
 */
export function updateImageById(value: Image): Promise<Image> {
  if (!value.id) {
    const error = new StatusError("updateImageById - No id on image");
    error.status = StatusCode.UNPROCESSABLE_ENTITY;
    throw error;
  }
  const rawStatement: string = `UPDATE ${tableMap.IMAGES} SET set_str WHERE id = ${value.id}`;

  const image = value.toDB()
  const updateStr = objToUpdateString(image, Image.editableColumns);

  return databaseAdaptor.getRunner(rawStatement.replace("set_str", updateStr), [])
    .then((results: QueryResult) => {
      const { rows } = results;
      if (rows.length <= 0) {
        const error = new StatusError(`updateImageById - image not found`);
        error.status = StatusCode.NOT_FOUND;
        throw error;
      }
      return new Image(rows[0]);
    })
    .catch((err: Error) => {
      console.error(`ERROR in update-image:`, err.message);
      throw err;
    });
}
