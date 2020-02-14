const moduleName = "authentication";

const path = require("path");
const jwt = require("jsonwebtoken");

const config = require(path.join(__base, "config/config"));

module.exports = authn = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    const message = "No token provided, access denied";
    return res.status(401).json(message);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT.JWTSecret);
    delete decoded.iat;
    delete decoded.exp;

    // Add user from payload
    req.client.user = decoded;
    next();
  } catch (e) {
    const message = "Token is not valid";
    res.status(400).json(message);
  }
};
