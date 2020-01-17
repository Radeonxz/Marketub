const moduleName = "controllers/projects/~";

const path = require("path");
// const _ = require('underscore');
const joi = require("joi");
// const uuidv4 = require('uuid/v4');

require(path.join(__base, "utils/object"));
const Projects = require(path.join(__base, "models/projects"));
const Users = require(path.join(__base, "models/users"));
const Query_Resp = require(path.join(__base, "models/query_response"));

// Project model
const ProjectM = new Projects();
const projectModel = ProjectM.getProjectModel();

// User model
const UserM = new Users();
const userModel = UserM.getUserModel();

// Response model
const query_resp = new Query_Resp();

/********************** CRUD Project **********************/
// Get project
exports.getProject = (req, res) => {
  const fctName = moduleName + "getProject ";

  const project_id = req.params.id;
  const query = { project_id };
  console.log("req.client.is_admin is", req.client.is_admin);
  // console.log('res.locals.clientIp is', req.client.ip);
  // console.log('req.user is', req.client.user);
  (async () => {
    try {
      const projectDB = await projectModel.findOne(query);
      if (!projectDB) {
        const str = "project_id: " + project_id + " not found";
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const query_response = query_resp.buildQueryRespA({ data: projectDB });
      return res.status(200).json(query_response);
    } catch (err) {
      const str = "projectModel.find err: " + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
};

// Get all projects of current user
exports.getAllProjects = (req, res) => {
  const fctName = moduleName + "getAllProjects ";

  const owner_id = req.client.user.account_info.user_id;
  const query = { owner_id };

  (async () => {
    try {
      const projectDB = await projectModel.find(query);

      if (!projectDB) {
        const str = "user_id: " + owner_id + " not found";
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const query_response = query_resp.buildQueryRespA({ data: projectDB });
      return res.status(200).json(query_response);
    } catch (err) {
      const str = "projectModel.find err: " + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
};

// Post project
exports.postProjectSchema = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
  },
  body: {
    // name: joi.array().items(joi.string().required(), joi.string()).required(),
    name: joi.string().required(),
    // description: joi.array().items(joi.string().required(), joi.string()).required(),
    description: joi.string().required(),
    skill_sets: joi.array(),
    timestamp: joi.string(),
    site_link: joi.string(),
    github_link: joi.string(),
    screenshot: joi.string()
  }
};

exports.postProject = (req, res) => {
  const fctName = moduleName + "postProject ";

  const owner_id = req.client.user.account_info.user_id;
  const query = { "account_info.user_id": owner_id };

  (async () => {
    try {
      // if (req.file === undefined) {
      //   throw Error(`File with extension not allowed.`);
      // }

      const userDB = await userModel.findOne(query);
      if (!userDB) {
        const str = "user_id: " + owner_id + " not found";
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const projectNM = ProjectM.addProject(req.body, req.file, owner_id);
      userDB.projects_array.push({ project_id: projectNM.project_id });

      await projectNM.save();
      await userDB.save();

      const respData = {
        project: projectNM,
        user_id: owner_id,
        affected: 1
      };

      const query_response = query_resp.buildQueryRespA(respData);
      return res.status(200).json(query_response);
    } catch (err) {
      const str = "projectNM.save err: " + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
};

// Put project
exports.putProjectSchema = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false
  },
  body: {
    // name: joi.array().items(joi.string().required(), joi.string()).required(),
    name: joi.string(),
    // description: joi.array().items(joi.string().required(), joi.string()).required(),
    description: joi.string(),
    skill_sets: joi.array(),
    timestamp: joi.string(),
    site_link: joi.string(),
    github_link: joi.string()
  }
};

exports.putProject = (req, res) => {
  const fctName = moduleName + "putProject ";

  const project_id = req.params.id;
  const owner_id = req.client.user.account_info.user_id;
  const query = { project_id };

  (async () => {
    try {
      const projectDB = await projectModel.findOne(query);
      if (!projectDB) {
        const str = "project_id: " + project_id + " not found";
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      const projectNM = ProjectM.updProject(projectDB, req.body, req.file);
      await projectNM.save();

      const respData = {
        project_id: projectNM.project_id,
        user_id: owner_id,
        affected: 1
      };

      const query_response = query_resp.buildQueryRespA({ data: respData });
      return res.status(200).json(query_response);
    } catch (err) {
      const str = "projectNM.save err: " + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      StatusErr.data.affected = 0;
      return res.status(403).json(StatusErr);
    }
  })();
};

// Delete project
exports.deleteProject = (req, res) => {
  const fctName = moduleName + "deleteProject ";

  const project_id = req.params.id;
  const query = { project_id };
  console.log("req.client.is_admin is", req.client.is_admin);
  // console.log('res.locals.clientIp is', req.client.ip);
  // console.log('req.user is', req.client.user);
  (async () => {
    try {
      const projectDB = await projectModel.findOne(query);
      if (!projectDB) {
        const str = "project_id: " + project_id + " not found";
        StatusErr.data.details = str;
        StatusErr.data.code = 404;
        return res.status(404).json(StatusErr);
      }

      await projectModel.findOneAndRemove(query);
      const respData = {
        project_id: project_id,
        affected: 1
      };

      const query_response = query_resp.buildQueryRespA({ data: respData });
      return res.status(200).json(query_response);
    } catch (err) {
      const str = "projectModel.find err: " + err.message;
      console.error(fctName + str);
      StatusErr.data.details = str;
      return res.status(403).json(err);
    }
  })();
};
