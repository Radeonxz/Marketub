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
        const str = 'email: ' + email + ' not found';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      await UserM.comparePass(password, userDB.password);
      const token = await UserM.generateJWT(userDB.user_id);
      const respData = {
        'token': token,
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'NoteM.update err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
};

exports.loginUser = loginUser;

// Register user
const registerUserSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    username: joi.string().required(),
    email: joi.string().email().required(),
    activation: joi.string().required(),
    password: joi.string().required(),
    password_confirm: joi.string().required(),
	}
};
exports.registerUserSchema = registerUserSchema;

registerUser = (req, res) => {
  const fctName = moduleName + 'registerUser ';
 
  const userNM = UserM.addUser(req.body);
  const user_id = userNM.user_id;

  (async () => {
    try{
      userNM.password = await UserM.hashPassword(userNM.password);
      await userNM.save();
      const token = await UserM.generateJWT(user_id);
      const respData = {
        'token': token,
        'user': {
          'user_id': user_id,
          'username': req.body.username,
          'email': req.body.email,
        },
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