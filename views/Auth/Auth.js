const moduleName = 'Auth.js';

const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require(path.join(__base, 'config/config'));

// User Model
const User = require(path.join(__base, 'models/User'));

// PostAuth
const postAuth = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if(!email || !password) {
    config.err_400.data.message = 'Please enter all fields'
    return res.status(400).json(config.err_400);
  }

  // Check for existing user
  User.findOne({ email })
  .then(user => {
    config.err_400.data.message = 'User does not exist'
    if(!user) return res.status(400).json(config.err_400);

    // Validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      config.err_400.data.message = 'Invalid credentials'
      if(!isMatch) return res.status(400).json(config.err_400);

      jwt.sign(
        // Payload, secret, expiration, callback
        { id: user.id }, config.JWT.JWTSecret, { expiresIn: 3600 }, (err, token) => {
          if(err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
};
exports.postAuth = postAuth;