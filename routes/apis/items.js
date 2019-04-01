const path = require('path');

const Items = require(path.join(__base, 'views/Items/Items'));
const auth = require(path.join(__base, 'middleware/auth'));

const setup = (app) => {
    app.get('/api/items', Items.getItems);
    app.get('/api/items/:id', auth, Items.getItem);
    app.post('/api/items', auth, Items.postItem);
    app.delete('/api/items/:id', auth, Items.deleteItem);
};
exports.setup = setup;