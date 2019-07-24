const moduleNam = 'M&P';
// const fctName = moduleNam + 'pid:' + process.pid;
const fctName = `${moduleNam}'s pid: ${process.pid}`;

const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
global.__base = __dirname + '/';
const config = require(path.join(__base, 'config/config'));
const routes = require(path.join(__base, 'initializers/routes'));
const logger = require(path.join(__base, 'middleware/logger'));

// Init express app setup
const app = express();
app.set('port', config.server.port);
app.set('mongoURL', config.mongodb.url);

// Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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
  // logger.info('Express server starting ....');
  const server = app.listen(app.get('port'), function () {
    // logger.info('Express server is listening on port ' + server.address().port + ', ' + fctName);
    console.info('Express server is listening on port ' + server.address().port + ', ' + fctName);
  });
}).catch((err) => {
  console.log(err);
});

module.exports = app;

// //mongodb config
// const db = config.mongodbURI;

// //Connect to mongoDB
// mongoose
// .connect(db, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// })
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err));


//Use Routes
// app.use('/api/items', require(path.join(__base, 'routes/api/items')));
// app.use('/api/users', require(path.join(__base, 'routes/api/users')));
// app.use('/api/auth', require(path.join(__base, 'routes/api/auth')));

// //init server
// const PORT = config.PORT || 5000
// app.listen(PORT, () => console.log(`Express server is listenning on port ${PORT}`));