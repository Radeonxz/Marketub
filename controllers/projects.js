const moduleName = 'controllers/projects/~';

const path = require('path');
// const _ = require('underscore');
const joi = require('joi');
// const uuidv4 = require('uuid/v4');

require(path.join(__base, 'utils/object'));
const Projects = require(path.join(__base, 'models/projects'));
const Query_Resp = require(path.join(__base, 'models/query_response'));

// Project model
const ProjectM = new Projects();
const projectModel = ProjectM.getProjectModel();

// Response model
const query_resp = new Query_Resp();

/********************** CRUD Project **********************/
// Get project
getProject = (req, res) => {
  const fctName = moduleName + 'getProject ';
 
  const project_id = req.params.id;
  const query = {project_id: project_id};
  console.log('req.client.is_admin is', req.client.is_admin);
  // console.log('res.locals.clientIp is', req.client.ip);
  // console.log('req.user is', req.client.user);
  (async () => {
    try{
      const projectDB = await projectModel.findOne(query);
      if(!projectDB) {
        const str = 'project_id: ' + project_id + ' not found';
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const query_response = query_resp.buildQueryRespA({'data': projectDB});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'projectModel.find err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
}

exports.getProject = getProject;

// Post project
const postProjectSchema = {
	options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
	},
	body: {
    name: joi.array().items(joi.string().required(), joi.string()).required(),
    description: joi.array().items(joi.string().required(), joi.string()).required(),
    skill_sets: joi.array(),
    timestamp: joi.string(),
    site_link: joi.string(),
    github_link: joi.string()
	}
};
exports.postProjectSchema = postProjectSchema;

postProject = (req, res) => {
  const fctName = moduleName + 'postProject ';

  const owner_id = req.client.user.account_info.user_id;

  (async () => {
    try{
      const projectNM = ProjectM.addProject(req.body, owner_id);
      await projectNM.save();
      const respData = {
        'project_id': projectNM.project_id,
        'affected': 1
      };

      const query_response = query_resp.buildQueryRespA({'data': respData});
      return res.status(200).json(query_response);
    } catch(err) {
      const str = 'projectNM.save err: ' + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
}

exports.postProject = postProject;