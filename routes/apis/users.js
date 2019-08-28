const path = require('path');
const validate 	= require('express-validation');

const users = require(path.join(__base, 'controllers/users'));

exports.setup = app => {
  app.get('/api/user/:id', users.getUser);
  app.get('/api/users', users.getAllUsers);
  app.delete('/api/user', validate(users.deleteUserSchema), users.deleteUser);
};