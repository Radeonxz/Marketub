const env = require('dotenv').config();

module.exports = {
  mongodbURI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWTSecret: process.env.JWTSECRET,

  node_env: process.env.NODE_ENV
};