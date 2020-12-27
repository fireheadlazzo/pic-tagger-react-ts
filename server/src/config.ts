import path from "path";
import nconf from "nconf";

nconf.overrides({});

nconf.env().argv(); // TODO: What does this do?

nconf.file({file: path.join(__dirname, "config.json")});

nconf.defaults({
    PROJECT_NAME: "",
    IMAGE_BUCKET: "",
    PORT: 8000,
    SQL_USER: "postgres",
    SQL_DATABASE: "postgres",
    SQL_HOST: "",
    SQL_PASSWORD: "",
    SQL_PORT: "1234",
});

export default nconf;
