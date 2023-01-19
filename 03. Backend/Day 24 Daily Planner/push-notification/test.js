const Redis = require("redis");

const RedisClient = Redis.createClient({ host: "localhost", port: 6379 });

RedisClient.on("error", function (err) {
  console.log("Error " + err);
});

RedisClient.on("connect", function () {
  console.log("Connected to Redis");
});

/*
let date = new Date();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

console.log(minutes, seconds);
*/

/*
axios
  .request(axiosOptions)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
*/
