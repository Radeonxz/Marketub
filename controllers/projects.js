const moduleName = 'controllers/projects/~';

const path = require('path');
// const _ = require('underscore');
// const joi = require('joi');
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
// Get paoject
// const getProjectSchema = {
// 	options: {
//     allowUnknownBody: false,
//     allowUnknownQuery: false
// 	},
// 	query: {
//     note_id: joi.string().guid().required()
// 	}
// };
// exports.getProjectSchema = getProjectSchema;

getProject = (req, res) => {
  const fctName = moduleName + 'getProject ';
 
  const project_id = req.params.id;
  const query = {project_id: project_id};
  console.log('res.locals.clientIp is', res.locals.clientIp);

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