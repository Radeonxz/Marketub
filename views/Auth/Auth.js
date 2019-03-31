const moduleName = 'Auth.js';

const path = require('path');
const config = require(path.join(__base, 'config/config'));
// const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require(path.join(__base, 'models/User'));

let res_400 = {
  'status': 'error',
  'data': {
      'level': 'ERR',
      'code': '400',
      'message': ''
  }
}


const postAuth = (req, res) => {
  const { email, password } = req.body;

  //validation
  if(!email || !password) {
    res_400.data.message = 'Please enter all fields111'
    console.log(res_400);
    return res.status(400).json(res_400);
    // return res.status(400).json({
    //   'status': 'error',
    //   'data': {
    //       'level': 'ERR',
    //       'code': '400',
    //       'message': 'Please enter all fields'
    //   }
    // });
  }

  //check for existing user
  User.findOne({ email })
  .then(user => {
    if(!user) return res.status(400).json({ msg: 'User does not exist' });

    //validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        //payload, secret, expiration, callback
        { id: user.id }, config.JWTSecret, { expiresIn: 3600 }, (err, token) => {
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