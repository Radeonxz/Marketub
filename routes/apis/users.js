const path = require('path');

const Users = require(path.join(__base, 'views/Users/Users'));

const setup = app => {
    // app.get('/api/items', Items.getItems);
    // app.get('/api/items/:id', Items.getItem);
    app.post('/api/users', Users.postUsers);
    // app.delete('/api/items/:id', Items.deleteItem);
};
exports.setup = setup;