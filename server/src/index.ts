import "module-alias/register";
import express from "express";
import config from "./config";
import router from "./router/router";
import morgan from "morgan";
import bp from "body-parser";

const app = express();
app.use(morgan("dev"));
app.use(bp.json());
app.use(bp.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

const PORT = config.get("PORT");
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  console.log(`SQL_PORT: ${config.get("SQL_PORT")}`);
});
