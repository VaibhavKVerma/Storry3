const resolve = require("path").resolve;
const dotEnvPath = resolve(".env");
require("dotenv").config({ path: dotEnvPath });
const express = require("express");
const app = express();

const mongoDb = require("./db/mongodb");
const redis = require("./db/redis");

const init = async () => {
  try {
    // Initialize MongoDB
    const mongoDbClient = mongoDb();
    await mongoDbClient.connectToMongoDb();

    // Initialize Redis
    const redisClient = redis();
    await redisClient.checkConnection();

    process.on('SIGINT', async () => {
      await mongoDbClient.closeMongoDbConnection();
      redisClient.closeConnection();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await mongoDbClient.closeMongoDbConnection();
      redisClient.closeConnection();
      process.exit(0);
    });

    

    app.listen(process.env.PORT_NUMBER, () => {
      console.log("Connection Started on PORT", process.env.PORT_NUMBER);
    });
  } catch (error) {
    console.error("Initialization error:", error);
    process.exit(1);
  }
};

init();
