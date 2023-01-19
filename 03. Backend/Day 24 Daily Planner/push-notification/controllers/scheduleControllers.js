const RedisClient = require("../config/connectRedis");

const webpush = require("web-push");

const publicKey =
  "BAZkLjpUJIrParwPRz90X0zpISPHEN0lyH2xSWK3Ka4Re3Fda4XAlznPTOoyd8DwVvDGY-5KH2X5adM2ejpFpeo";
const privateKey = "-0DknlbOzy4tKfb7K1VcwTYBnxe2hTDYEcHJ74VN9w4";

webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);

// @ROUTE:  POST /api/v1/schedule
// @DESC:   Create a new schedule
// @ACCESS: Public

const createSchedule = async (req, res) => {
  try {
    const { schedule, subscription } = req.body;
    console.log(schedule);
    console.log(subscription);

    const payload = JSON.stringify({
      title: "Hello World",
      body: "This is your first push notification",
    });

    webpush.sendNotification(subscription, payload).catch(console.log);
    await RedisClient.set("schedule", JSON.stringify(schedule));
    // await RedisClient.set("subscription", JSON.stringify(subscription));

    res.status(200).json({
      success: true,
      data: {
        message: "Schedule created successfully",
        /*createdSchedule: schedule,*/
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createSchedule,
};
