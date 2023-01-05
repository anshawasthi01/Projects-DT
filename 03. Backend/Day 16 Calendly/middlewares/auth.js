const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// when we to this middleware next will automatically next middlewares
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; //["Bearer", "{TOKEN}"]

    if (!authHeader) {
      return res.status(401).json({
        err: "You must be logged in",
      });
    }

    const token = authHeader.split(" ")[1]; // This is the bearer token

    // if (!token) {
    //   return res.status(401).json({
    //     err: "No token, authorization denied",
    //   });
    // }

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById( decoded.user.id );

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(503).json({
      err: "Token is not valid",
    });
  }
};

module.exports = { isAuthenticated };
