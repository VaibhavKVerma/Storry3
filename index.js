const resolve = require("path").resolve;
const dotEnvPath = resolve(".env");
require("dotenv").config({ path: dotEnvPath });
const express = require("express");
const app = express();

const mongoDbConnect = require("./db/mongodb");

const init = async () => {
  try {
    await mongoDbConnect.connect();
    app.listen(process.env.PORT_NUMBER, () => {
      console.log("Connection Started on PORT", process.env.PORT_NUMBER);
    });
  } catch (error) {}
};

init();
