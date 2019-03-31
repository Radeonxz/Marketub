const path = require('path');
const validate = require('express-validation');

const Auth = require(path.join(__base, 'views/Auth/Auth'));

const setup = (app) => {
    // app.get('/post', validate(Post.getSchema), Post.getPost);
    app.post('/api/auth', Auth.postAuth);
};
exports.setup = setup;