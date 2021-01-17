import config from "config";
import { Pool } from "pg";

export default new Pool({
  user: config.get("SQL_USER"),
  host: config.get("SQL_HOST"),
  password: config.get("SQL_PASSWORD"),
  database: config.get("SQL_DATABASE"),
  port: config.get("SQL_PORT"),
});