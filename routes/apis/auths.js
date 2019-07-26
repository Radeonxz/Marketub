const path = require('path');
const validate 	= require('express-validation');

const auths = require(path.join(__base, 'controllers/auths'));

const setup = app => {
    app.post('/api/login', validate(auths.loginUserSchema), auths.loginUser);
    app.post('/api/register', validate(auths.registerUserSchema), auths.registerUser);
};
exports.setup = setup;