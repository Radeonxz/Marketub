const moduleNam = 'server';
const fctName = `${moduleNam}'s pid: ${process.pid}`;

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

global.__base = __dirname + '/';
const config = require(path.join(__base, 'config/config'));
const routes = require(path.join(__base, 'initializers/routes'));
const logger = require(path.join(__base, 'middlewares/logger'));

// Init express app setup
const app = express();
app.set('port', config.server.port);
app.set('mongoURL', config.mongodb.url);

// Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Init logger middleware
app.use(logger);

// Init routes setup
routes.setup(app);

// Routes validation
const reditectUnmatchedAPI = (req, res) => {
  return res.status(400).json({
    'status': 'error',
    'data': {
      'level': 'ERR',
      'code': '400',
      'message': 'Invalid API Call',
      'details': 'Invalid API Call'
    }
  });
}
app.all('*', reditectUnmatchedAPI);

// Serve static assets if in production
if(config.node_env ==='production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// MongoDB setup
const MongoDBOptions = {
  useNewUrlParser: true,
  useCreateIndex: true
}

mongoose.connect(app.get('mongoURL'), MongoDBOptions)
.then(() => {
  // Start server
  console.info('Express server starting ....');
  const server = app.listen(app.get('port'), function () {
    console.info('Express server is listening on port ' + server.address().port + ', ' + fctName);
  });
}).catch((err) => {
  console.error(err);
});

module.exports = app;