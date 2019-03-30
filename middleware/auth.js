const path = require('path');
const jwt = require('jsonwebtoken');

const config = require(path.join(__base, 'config/config'));

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  //check for token
  if(!token) return res.status(401).json({ msg: 'No token provided, access denied' });

  try{
    //verify token
    const decoded = jwt.verify(token, config.JWTSecret);
    //add user from payload
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;