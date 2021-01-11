import "module-alias/register";
import express from "express";
// import { Request, Response, NextFunction } from "express";
import config from "./config";
import router from "./router/router";
import morgan from "morgan";
// import * as constants from "./models/constants";
// import { StatusError } from "./models/status-error";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

const PORT = config.get("PORT");
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  console.log(`SQL_PORT: ${config.get("SQL_PORT")}`);
});
