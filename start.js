const express = require("express");
const app = express();
const Status = require("http-status");

const apiRouter = require("./routes");

app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.use("/api/V1", apiRouter);

app.all("*", (req, res, next) => {
  return res.status(Status.NOT_FOUND).json({
    message: "No such endpoint exists",
  });
});

module.exports = app;
