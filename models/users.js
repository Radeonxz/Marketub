const moduleName = 'models/users/~';

const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require(path.join(__base, 'config/config'));
require(path.join(__base, 'utils/object'));
const userSchema = require(path.join(__base, 'mongoose/users/schema')).UserSchema;
const nodemailer = require(path.join(__base, 'utils/nodemailer'));

function Users() {
  this.name = "Users Object";
    
  this.getUserModel = () => {
	  return mongoose.model('User', userSchema);
  };

  this.addUser = req => {
    const code = config.activation.code;
    this.checkPassword(req.password, req.password_confirm);
    if(req.activation !== code) {
      throw Error(`Please provide your activation code.`);
    }

    const userModel = this.getUserModel();
    const userNM = new userModel(req);
    // userNM.user_id = uuidv4();
    userNM.user_id = 111;
    return userNM;
  };

  this.checkPassword = (password, password_confirm) => {
    if(password !== password_confirm) {
      throw Error(`Passwords not match.`);
    }
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

  this.generateJWT = user => {
    const JWTSecret = config.JWT.JWTSecret;
    const jwtOptions = {
      user_id: user.user_id,
      is_first_login: user.is_first_login,
    }
    return new Promise((resolve, reject) => {
      jwt.sign(jwtOptions, JWTSecret, { expiresIn: 3600 }, (err, token) => {
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

  this.genTempJWT = () => {
    const tempJWT = {
      token: crypto.randomBytes(20).toString('hex'),
      expires: Date.now() + 360000,
    };
    return tempJWT;
  };

  this.buildMailObj = (user, mailTemp, token) => {
    let subject = '';
    let url;
    switch(mailTemp) {
      case 'register':
        subject = 'Welcome';
        url = `http://localhost:5555/auth/activate?token=${token}`;
        break;

      case 'get_activation':
          subject = 'Activate account';
          url = `http://localhost:5555/auth/activate?token=${token}`;
          break;
      
      case 'forgot_password':
        subject = 'Change password';
        url= `http://localhost:5555/auth/reset_password?token=${token}`;
        break;
      
      case 'reset_password':
        subject = 'Password changed'
        break;
    }

    const mailData = {
      from: config.nodemailer.email,
      to: user.email,
      subject: subject,
      template: mailTemp,
      context: {
        url: url ? url : null,
        username: user.username
      }
    };
    return mailData;
  };

  this.sendResetTokenMail = mailData => {
    const smtpTransport = nodemailer.nodemailerSetup(mailData.template);
    return new Promise((resolve, reject) => {
      smtpTransport.sendMail(mailData, (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
}

module.exports = Users;