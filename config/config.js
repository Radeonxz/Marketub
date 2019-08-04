const config = {};

// module.exports = {
//   mongodbURI: process.env.MONGODB_URI,
//   PORT: process.env.PORT,
//   JWTSecret: process.env.JWTSECRET,

//   node_env: process.env.NODE_ENV,


//   // http error code 400
//   err_400: {
//     'status': 'error',
//     'data': {
//         'level': 'ERR',
//         'code': '400',
//         'message': ''
//     }
//   }
// };

config.server = {
  'port': process.env.PORT || 5000
};

config.JWT = {
  'JWTSecret': process.env.JWTSECRET
}

config.activation = {
  'code': process.env.ACTIVATION
}

config.nodemailer = {
  'service': process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  'email': process.env.MAILER_SERVICE_USER,
  'password': process.env.MAILER_SERVICE_PASS,
}

config.mongodb = {
  'schemaOptions': {
    autoIndex: true,
    strict: true
  },
  'url': process.env.MONGODB_URI
};

module.exports = config;