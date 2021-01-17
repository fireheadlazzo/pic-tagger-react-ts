import {Pool} from "pg";
import config from "config";

export default new Pool({
  user: config.get("SQL_USER"),
  host: config.get("SQL_HOST"),
  password: config.get("SQL_PASSWORD"),
  database: config.get("SQL_DATABASE"),
  port: config.get("SQL_PORT"),
});