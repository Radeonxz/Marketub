const moduleName = 'controllers/users/~';

const path = require('path');
const _ = require('underscore');
const joi = require('joi');
// const uuidv4 = require('uuid/v4');

require(path.join(__base, 'utils/object'));
const Users = require(path.join(__base, 'models/users'));
const Projects = require(path.join(__base, 'models/projects'));
const Query_Resp = require(path.join(__base, 'models/query_response'));

// User model
const UserM = new Users();
const userModel = UserM.getUserModel();

// Project model
const ProjectM = new Projects();
const projectModel = ProjectM.getProjectModel();

// Response model
const query_resp = new Query_Resp();

/********************** CRUD User **********************/
// Get user
exports.getUser = (req, res) => {
  const fctName = moduleName + 'getUser ';
 
  const username = req.params.id;
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

      const project_ids = _.pluck(userDB.projects_array, 'project_id');
      const projects = await projectModel.find({project_id: project_ids});
      _.each(userDB.projects_array, userProject => {
        const project = _.find(projects, p => {
          return userProject.project_id === p.project_id;
        });
        _.extend(userProject, project);
      });

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

// Get all users
exports.getAllUsers = (req, res) => {
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
      console.log('query_response is', query_response);
      _.each(query_response.data, user => {
        user.user_id = user.account_info.user_id;
        delete user.account_info;
      });
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userModel.find err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
}

// Delete user
exports.deleteUserSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	query: {
    user_id: joi.string().required(),
    email: joi.string().email().required()
	}
};

exports.deleteUser = (req, res) => {
  const fctName = moduleName + 'deleteUser ';
 
  const user_id = req.query.user_id;
  const email = req.query.email;

  const query = {email: email, user_id: user_id};

  (async () => {
    try{
      const userDB = await userModel.findOne(query);
      if(!userDB) {
        const str = `user_id: ${user_id} with user's emai: ${email} not found`;
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      await userModel.findOneAndRemove(query);
      const respData = {
        'user_id': user_id,
        'affected': 1
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'userModel.find err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
}