const { getQuote } = require("../utils/randomQuoteGenerator");
const RedisClient = require("../config/connectRedis");

// ["0",   "1",   "2",   "3",   "4",   "5",   "6",   "7",   "8"]
// [ 9-10, 10-11, 11-12, 12-13, 13-14, 14-15, 15-16, 16-17, 17-18]

const sendMessage = async () => {
  let date = new Date();
  let minutes = date.getMinutes();
  let hour = date.getHours();
  const schedule = await RedisClient.get("schedule");
  const parsedSchedule = JSON.parse(schedule);

  const index = hour - 9;

  if (minutes === 30) {
    // send quote
    console.log(getQuote());
  } else {
    if (index - 1 >= 0) {
      console.log(
        `It's time to start ${parsedSchedule[index]} task, was ${
          parsedSchedule[index - 1]
        } completed?`
      );
    } else if (index === 0) {
      console.log(`It's time to start ${parsedSchedule[index]}`);
    }
  }
};

module.exports = { sendMessage };
