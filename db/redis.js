const redis = require("redis");
const resolve = require("path").resolve;
const dotEnvPath = resolve(".env");
require("dotenv").config({ path: dotEnvPath });

const defaultExpiryInSeconds = 600;

module.exports = () => {
  const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  client.on("error", (err) => {
    console.error(`Error connecting to Redis: ${err}`);
  });

  const checkConnection = async () => {
    try {
      await client.connect();
      const reply = await client.ping();
      console.log(`Redis is connected: ${reply === "PONG"}`);
    } catch (err) {
      console.error(`Error with ping command: ${err}`);
    }
  }

  const closeConnection = () => {
    client.quit();
    console.log("Closed Redis connection");
  };

  const _constructKey = (cacheName, key) => cacheName + "_" + key;

  const setKey = (
    cacheName,
    key,
    json,
    expiryInSeconds = defaultExpiryInSeconds
  ) => {
    client.set(
      _constructKey(cacheName, key),
      JSON.stringify(json),
      "EX",
      expiryInSeconds
    );
  };

  const getKey = async (cacheName, key) => {
    const res = await client.get(_constructKey(cacheName, key));
    if (!res || res.length === 0) {
      return null;
    }
    try {
      return JSON.parse(res);
    } catch (e) {
      return null;
    }
  };

  return {
    setKey,
    getKey,
    checkConnection,
    closeConnection
  };
};
