const Router = require("express").Router();
const {
  createSchedule,
} = require("../controllers/scheduleControllers");

Router.route("/").post(createSchedule);

module.exports = Router;
