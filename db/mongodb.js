const mongoose = require("mongoose");
const resolve = require("path").resolve;
const dotEnvPath = resolve(".env");
require("dotenv").config({ path: dotEnvPath });

const mongoDbUri = process.env.MONGO_DB_URI;

const connect = async () => {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(mongoDbUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
};

module.exports = {
  connect,
};
