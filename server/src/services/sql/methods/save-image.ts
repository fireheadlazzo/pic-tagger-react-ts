import { PoolClient, QueryResult } from "pg";
import { tableMap } from "../../../models/constants";
import { Image } from "../../../models/image";
import cloudsql from "../database-adaptor";

/**
 * Image save funtion
 * @param value 
 */
// type ISaveObject = Image | Tag;
export function saveImage(value: any) {
    const rawStatement: string = `INSERT INTO ${tableMap.IMAGES} (columns) VALUES (valueNums) RETURNING ${Image.primaryKey}`;
    const values: any[] = [];
    const valueNums = Image.columns
        .map((key: string, index: number) => {
            values.push(value[key])
            return `$${index+1}`;
        });
    
    const statement = rawStatement
        .replace("columns", Image.columns.join(","))
        .replace("valueNums", valueNums.join(","));

    Image.columns.forEach((e:string, index: number) => {
        console.log(e, values[index]);
        console.log(valueNums[index]);
    });
    console.log(statement);
    return cloudsql.connect()
    .then((client: PoolClient) => {
        return new Promise<any>((resolve, reject) => {
            client.query(statement, values, (err: Error, results: QueryResult) => {
                client.release();
                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    })
    .then((results: QueryResult) => {
        const {rows} = results;
        value[Image.primaryKey] = rows[0][Image.primaryKey];
        return value;
    })
    .catch((err: Error) => {
        throw err;
    });
}