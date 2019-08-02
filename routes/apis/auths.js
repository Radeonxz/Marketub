const path = require('path');
const validate 	= require('express-validation');

const auths = require(path.join(__base, 'controllers/auths'));
const Authn = require(path.join(__base, 'middlewares/authentication'));

const setup = app => {
    app.post('/api/auth/login', validate(auths.loginUserSchema), auths.loginUser);
    app.get('/api/auth/get_activation', Authn, validate(auths.getActivationSchema), auths.getActivation);
    app.post('/api/auth/activate', validate(auths.userActivateSchema), auths.userActivate);
    app.post('/api/auth/register', validate(auths.registerUserSchema), auths.registerUser);
    app.post('/api/auth/forgot_password', validate(auths.forgotPasswordSchema), auths.forgotPassword);
    app.post('/api/auth/reset_password', validate(auths.resetPasswordSchema), auths.resetPassword);
};
exports.setup = setup;