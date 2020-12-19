import path from "path";
import nconf from "nconf";

nconf.overrides({
    // SQL_HOST: "",
    // SQL_USER: "",
    // SQL_PASSWORD: "",
    // SQL_DATABASE: "",
    // SQL_PORT: "",
});

nconf.env().argv();

nconf.file({file: path.join(__dirname, "config.json")});

nconf.defaults({
    SQL_HOST: "DEFAULT_SQL_HOST",
    SQL_USER: "DEFAULT_SQL_USER",
    SQL_PASSWORD: "DEFAULT_SQL_PASSWORD",
    SQL_DATABASE: "DEFAULT_SQL_DATABASE",
    SQL_PORT: "DEFAULT_SQL_PORT",
});

export default nconf;