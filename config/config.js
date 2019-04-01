const env = require('dotenv').config();

module.exports = {
  mongodbURI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWTSecret: process.env.JWTSECRET,

  node_env: process.env.NODE_ENV,


  // http error code 400
  err_400: {
    'status': 'error',
    'data': {
        'level': 'ERR',
        'code': '400',
        'message': ''
    }
  }
};