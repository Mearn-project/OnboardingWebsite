const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User");
const jwtValidation = (req, res, next) => {
  // // get token from cookie
  // const token = req.cookies.jwt;

  // get token from header
  const token = req.headers.authorization.split(" ")[1];
  if (!token || validator.isEmpty(token)) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  // decode token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded.id || !validator.isMongoId(decoded.id)) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  // assign data inside the token to the request body so that we can directly access these data in the request object in the route handler functions
  req.body.userId = decoded.id;
  req.body.username = decoded.username;

  next();
};
const checkIsHR = async (req, res, next) => {
  try {
    // Check if the user associated with the decoded JWT has isHR set to true
    const user = await User.findById(req.body.userId);
    // console.log(user.isHR);
    if (!user || !user.isHR) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an HR." });
    }

    // Call next() if the user is an HR
    next();
  } catch (error) {
    console.error("Error checking if user is HR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { jwtValidation, checkIsHR };
