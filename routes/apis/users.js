const path = require('path');
const validate 	= require('express-validation');

const users = require(path.join(__base, 'controllers/users'));

const setup = app => {
    // app.get('/api/items', Items.getItems);
    app.get('/api/user/:id', users.getUser);
    app.get('/api/users', users.getAllUsers);
    // app.post('/api/user', validate(users.postUserSchema), users.postUser);
    // app.delete('/api/items/:id', Items.deleteItem);
};
exports.setup = setup;