const moduleName = 'controllers/projects/~';

const path = require('path');
const joi = require('joi');

require(path.join(__base, 'utils/object'));
const Users = require(path.join(__base, 'models/users'));
const Query_Resp = require(path.join(__base, 'models/query_response'));

// User model
const UserM = new Users();
const userModel = UserM.getUserModel();

// Response model
const query_resp = new Query_Resp();

// Login user
const loginUserSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    email: joi.string().email().required(),
    password: joi.string().required(),
	}
};
exports.loginUserSchema = loginUserSchema;

loginUser = (req, res) => {
  const fctName = moduleName + 'loginUser ';

  const { email, password } = req.body;
  const query = {email: email};

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = `Email: ${email} not found`;
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      await UserM.comparePass(password, userDB.password);
      const token = await UserM.generateJWT(userDB);
      const respData = {
        'token': token,
      };

      if(userDB.account_status.email_confirmed === false) {
        const str = `Please activate account by confirming your email address`;
        StatusErr.data.details = str;
        StatusErr.data.token = token;
        StatusErr.data.code = 401;
        return res.status(401).json(StatusErr);
      }

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = `userDB.find err: ${err.message}`;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
};

exports.loginUser = loginUser;

// Get activation link
const getActivationSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	query: {}
};
exports.getActivationSchema = getActivationSchema;

getActivation = (req, res) => {
  const fctName = moduleName + 'getActivation ';
  console.log('req.client', req.client);
  const mailTemp = req.client.route;
  const user_id = req.client.user.account_info.user_id;
  const query = {'account_info.user_id': user_id};

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = `User_id: ${user_id} not found`;
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const tempJWT = await UserM.genTempJWT();
      userDB.account_status.email_confirm_token = tempJWT.token;
      userDB.account_status.email_confirm_expires = tempJWT.expires;
      await userDB.save();
      const mailObj = UserM.buildMailObj(userDB, mailTemp, tempJWT.token);
      const mailRes = await UserM.sendResetTokenMail(mailObj);
      const respData = {
        'response': mailRes.response,
        'tempToken': tempJWT.token,
        'account_info': userNM.account_info,
        'affected': 0
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = `userDB.find err: ${err.message}`;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
};

exports.getActivation = getActivation;

// Activate user
const userActivateSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    token: joi.string().required()
	}
};
exports.userActivateSchema = userActivateSchema;

userActivate = (req, res) => {
  const fctName = moduleName + 'userActivate ';

  const mailTemp = req.client.route;
  const { token } = req.body;
  const query = {
    'account_status.email_confirm_token': token,
    'account_status.email_confirm_expires': {
      $gt: Date.now()
    }
  };

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = 'Token is invalid or expired';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      userDB.account_status.email_confirm_token = null;
      userDB.account_status.email_confirm_expires = null;
      userDB.account_status.email_confirmed = true;
      await userDB.save();
      const mailObj = UserM.buildMailObj(userDB, mailTemp);
      const mailRes = await UserM.sendResetTokenMail(mailObj);
      const token = await UserM.generateJWT(userDB);
      const respData = {
        'token': token,
        'response': mailRes.response,
        'account_info': userNM.account_info,
        'affected': 1
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userDB.update err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
}

exports.userActivate = userActivate;

// Register user
const registerUserSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    username: joi.string().required(),
    role_id: joi.number(),
    email: joi.string().email().required(),
    activation: joi.string().required(),
    password: joi.string().required(),
    password_confirm: joi.string().required(),
	}
};
exports.registerUserSchema = registerUserSchema;

registerUser = (req, res) => {
  const fctName = moduleName + 'registerUser ';
  const mailTemp = req.client.route;

  (async () => {
    try{
      const userNM = UserM.addUser(req.body);
      userNM.password = await UserM.hashPassword(userNM.password);
      const tempJWT = await UserM.genTempJWT();
      userNM.account_status.email_confirm_token = tempJWT.token;
      userNM.account_status.email_confirm_expires = tempJWT.expires;
      await userNM.save();
      const mailObj = UserM.buildMailObj(userNM, mailTemp, tempJWT.token);
      const mailRes = await UserM.sendResetTokenMail(mailObj);
      const token = await UserM.generateJWT(userNM);
      const respData = {
        'token': token,
        'response': mailRes.response,
        'account_info': userNM.account_info,
        'affected': 1
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userNM.save err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
}

exports.registerUser = registerUser;

// Forgot password
const forgotPasswordSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    email: joi.string().email().required()
	}
};
exports.forgotPasswordSchema = forgotPasswordSchema;

forgotPassword = (req, res) => {
  const fctName = moduleName + 'forgotPassword ';
 
  const mailTemp = req.client.route;
  const { email } = req.body;
  const query = {email: email};

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = 'email: ' + email + ' not found';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const tempJWT = await UserM.genTempJWT();
      userDB.account_status.reset_password_token = tempJWT.token;
      userDB.account_status.reset_password_expires = tempJWT.expires;
      await userDB.save();
      const mailObj = UserM.buildMailObj(userDB, mailTemp, tempJWT.token);
      const mailRes = await UserM.sendResetTokenMail(mailObj);
      const respData = {
        // 'token': tempJWT.token,
        'response': mailRes.response,
        'user': {
          'user_id': userDB.user_id,
          'username': userDB.username,
          'email': userDB.email,
        },
        'affected': 0
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userDB.update err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
}

exports.forgotPassword = forgotPassword;

// Reset password
const resetPasswordSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    token: joi.string().required(),
    password: joi.string().required(),
    password_confirm: joi.string().required(),
	}
};
exports.resetPasswordSchema = resetPasswordSchema;

resetPassword = (req, res) => {
  const fctName = moduleName + 'resetPassword ';
 
  const mailTemp = req.client.route;
  const { token, password, password_confirm } = req.body;
  const query = {
    'account_status.reset_password_token': token,
    'account_status.reset_password_expires': {
      $gt: Date.now()
    }
  };

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = 'Token is invalid or expired';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      UserM.checkPassword(password, password_confirm);
      userDB.password = await UserM.hashPassword(password);
      userDB.account_status.reset_password_token = null;
      userDB.account_status.reset_password_expires = null;
      await userDB.save();
      const mailObj = UserM.buildMailObj(userDB, mailTemp);
      const mailRes = await UserM.sendResetTokenMail(mailObj);
      const token = await UserM.generateJWT(userDB.user_id);
      const respData = {
        'token': token,
        'response': mailRes.response,
        'user': {
          'user_id': userDB.user_id,
          'username': userDB.username,
          'email': userDB.email,
        },
        'affected': 1
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userDB.update err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
}

exports.resetPassword = resetPassword;