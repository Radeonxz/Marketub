const moduleName = 'logger';

const moment = require('moment');
module.exports =  logger = (req, res, next) => {
  console.log(`${req.method}: ${req.protocol}://${req.get('host')}${req.originalUrl}, ${moment().format()}`);
  req.client = {
    ip: (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
    route: req.originalUrl.slice(5),
  }
  next();
};