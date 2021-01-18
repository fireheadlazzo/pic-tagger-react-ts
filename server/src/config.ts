import path from "path";
import nconf from "nconf";

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
console.log(`PROJECT_NAME: ${nconf.get("PROJECT_NAME")}`);
console.log(`IMAGE_BUCKET: ${nconf.get("IMAGE_BUCKET")}`);
console.log(`SQL_USER: ${nconf.get("SQL_USER")}`);
console.log(`SQL_DATABASE: ${nconf.get("SQL_DATABASE")}`);
console.log(`SQL_HOST: ${nconf.get("SQL_HOST")}`);
console.log(`SQL_PASSWORD: ${nconf.get("SQL_PASSWORD")}`);
console.log(`SQL_PORT: ${nconf.get("SQL_PORT")}`);

export default nconf;
