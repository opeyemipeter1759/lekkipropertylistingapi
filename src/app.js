const express = require("express");
const helmet = require("helmet");
const config = require("../config");
const error = require("./error");
const routes = require("./route");

const app = express();


app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(helmet());
if (config.isDev) {
  app.use(require("morgan")("dev"));
}
app.use('/v1', routes);
app.use(error.allExceptionCatcher());

module.exports = app;
