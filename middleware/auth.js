const path = require('path');
const jwt = require('jsonwebtoken');

const config = require(path.join(__base, 'config/config'));

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if(!token) {
    config.err_400.data.message = 'No token provided, access denied';
    return res.status(401).json(config.err_400.data);
  }

  try{
    // Verify token
    const decoded = jwt.verify(token, config.JWTSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch(e) {
    config.err_400.data.message = 'Token is not valid';
    res.status(400).json(config.err_400);
  }
}

module.exports = auth;