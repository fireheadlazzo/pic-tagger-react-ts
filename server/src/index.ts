import "module-alias/register";
import express from "express";
import config from "./config";
import router from "./router/router";

const app = express();
app.use(router.app);
const PORT = config.get("PORT");

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  console.log(`SQL_PORT: ${config.get("SQL_PORT")}`);
});
