const moduleName = 'controllers/users/~';

const path = require('path');
// const _ = require('underscore');
const joi = require('joi');
// const uuidv4 = require('uuid/v4');

require(path.join(__base, 'utils/object'));
const Users = require(path.join(__base, 'models/users'));
const Query_Resp = require(path.join(__base, 'models/query_response'));

// User model
const UserM = new Users();
const userModel = UserM.getUserModel();

// Response model
const query_resp = new Query_Resp();

/********************** CRUD User **********************/
// Get user
// const getUserSchema = {
// 	options: {
//     allowUnknownBody: false,
//     allowUnknownQuery: false
// 	},
// 	query: {
//     note_id: joi.string().guid().required()
// 	}
// };
// exports.getUserSchema = getUserSchema;

getUser = (req, res) => {
  const fctName = moduleName + 'getUser ';
 
  const username = req.params.id;
  console.log('username is', req.params);
  const query = {username: username};

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = 'username: ' + username + ' not found';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const query_response = query_resp.buildQueryRespA({'data': userDB});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userModel.find err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
}

exports.getUser = getUser;

// Get all users
getAllUsers = (req, res) => {
  const fctName = moduleName + 'getAllUsers ';

  (async () => {
    try{
      const userDB = await userModel.find({});
      if(!userDB) {
        const str = 'No users found';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const query_response = query_resp.buildQueryRespA({'data': userDB});
      // console.log('query_response is', query_response);
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userModel.find err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
}

exports.getAllUsers = getAllUsers;

// Post user
const postUserSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    password_confirm: joi.string().required(),
	}
};
exports.postUserSchema = postUserSchema;

postUser = (req, res) => {
  const fctName = moduleName + 'postUser ';
 
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

exports.postUser = postUser;