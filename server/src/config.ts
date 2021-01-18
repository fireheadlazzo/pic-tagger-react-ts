import path from "path";
import nconf from "nconf";
import StatusCode from "http-status";
import { StatusError } from "models/status-error";

nconf.overrides({});

nconf.env().argv(); // TODO: What does this do?

nconf.file({ file: path.join(__dirname, "config.json") });

nconf.defaults({
  PROJECT_NAME: "",
  STORAGE_CREDENTIALS: "../cs-credentials.json",
  IMAGE_BUCKET: "",
  PORT: 8000,
  SQL_USER: "postgres",
  SQL_DATABASE: "postgres",
  SQL_HOST: "",
  SQL_PASSWORD: "",
  SQL_PORT: "",
  // hard-coded constants
  LIST_IMAGES_MAX_PAGE_SIZE: 32,
  LIST_TAGS_MAX_PAGE_SIZE: 32,
});

console.log(`checking config variables:`);
const checkConfigs = [
"PROJECT_NAME",
"IMAGE_BUCKET",
"SQL_USER",
"SQL_DATABASE",
"SQL_HOST",
"SQL_PASSWORD",
"SQL_PORT",
];
const missingConfigs = checkConfigs.filter((config: string) => {
  if (!nconf.get(config)) {
    return true;
  }
  return false;
});
if (missingConfigs.length > 0) {
  const errorFields = missingConfigs.join(",");
  const err = new StatusError(`Error initializing configs. Missing fields [${errorFields}]`);
  err.status = StatusCode.INTERNAL_SERVER_ERROR;
  throw err;
}

export default nconf;
