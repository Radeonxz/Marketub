const moduleName = 'models/projects/~';

const path = require('path');
// const _ = require('underscore');
const mongoose = require('mongoose');
// const uuidv4 = require('uuid/v4');

require(path.join(__base, 'utils/object'));
const projectSchema = require(path.join(__base, 'mongoose/projects/schema')).projectSchema;

module.exports = function Projects() {
  this.name = "Projects Object";
    
  this.getProjectModel = () => {
	  return mongoose.model('Project', projectSchema);
  };

  this.addProject = (req, file, owner_id) => {
    const projectModel = this.getProjectModel();
    const projectNM = new projectModel(req);
    projectNM.owner_id = owner_id;
    projectNM.project_id = 111;
    projectNM.screenshot = file.path;
    return projectNM;
  };

  this.updProject = (project, req, file) => {
    const projectNM = Object.assign(project, req);
    if(file !== undefined) {
      projectNM.screenshot = file.path;
    }
    return projectNM;
  };
};