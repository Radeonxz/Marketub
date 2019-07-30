const path = require('path');
const validate 	= require('express-validation');

const auths = require(path.join(__base, 'controllers/auths'));
const Auth = require(path.join(__base, 'middlewares/authentication'));

const setup = app => {
    app.post('/api/login', validate(auths.loginUserSchema), auths.loginUser);
    app.get('/api/get_activation', Auth, validate(auths.getActivationSchema), auths.getActivation);
    app.post('/api/activate', validate(auths.userActivateSchema), auths.userActivate);
    app.post('/api/register', validate(auths.registerUserSchema), auths.registerUser);
    app.post('/api/forgot_password', validate(auths.forgotPasswordSchema), auths.forgotPassword);
    app.post('/api/reset_password', validate(auths.resetPasswordSchema), auths.resetPassword);
};
exports.setup = setup;