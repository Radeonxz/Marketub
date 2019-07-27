const moduleName = 'models/users/~';

const path = require('path');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require(path.join(__base, 'config/config'));
require(path.join(__base, 'utils/object'));
const userSchema = require(path.join(__base, 'mongoose/users/schema')).UserSchema;

function Users() {
  this.name = "Users Object";
    
  this.getUserModel = () => {
	  return mongoose.model('User', userSchema);
  };

  this.addUser = req => {
    const code = config.activation.code;
    if(req.password !== req.password_confirm) {
      throw Error(`Passwords not match.`);
    }
    if(req.activation !== code) {
      throw Error(`Please provide your activation code.`);
    }

    const userModel = this.getUserModel();
    const userNM = new userModel(req);
    // userNM.user_id = uuidv4();
    userNM.user_id = 111;
    return userNM;
  };

  this.hashPassword = password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, passHashed) => {
          err ? reject(err) : resolve(passHashed);
        });
      });
    });
  }

  this.generateJWT = user_id => {
    const JWTSecret = config.JWT.JWTSecret;
    return new Promise((resolve, reject) => {
      jwt.sign({ id: user_id }, JWTSecret, { expiresIn: 3600 }, (err, token) => {
        err ? reject(err) : resolve(token);
      });
    });
  };

  this.comparePass = async (inputPass, dbPass) => {
    isMatch = await bcrypt.compare(inputPass, dbPass);
    if(!isMatch) {
      throw Error(`Invalid credentials`);
    }
    return;
  };
}

module.exports = Users;