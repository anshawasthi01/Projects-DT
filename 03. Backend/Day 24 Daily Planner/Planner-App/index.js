const express = require("express");
const logger = require("morgan");
const app = express();
require("./services/scheduler");
const scheduleRoutes = require("./routes/scheduleRoutes");
const RedisClient = require("./config/connectRedis");

const PORT = 1338;

// Middleware
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/api/v1/schedule", scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  RedisClient.connect()
  .then(console.log("Connected to redis"))
  .catch((err) => {
    console.log("Error " + err);
  });
});
