const express = require("express");
const app = express();


app.use("/user", require("./users"));
app.use(require("./login"));
app.use("/companies", require("./companies"));
app.use("/employee", require("./employees"));
app.use("/", express.static("ui"));

module.exports = app;