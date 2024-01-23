const redis = require("redis");
const resolve = require("path").resolve;
const dotEnvPath = resolve(".env");
require("dotenv").config({ path: dotEnvPath });

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
    getKey
  }
};