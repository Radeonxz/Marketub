const moduleName = 'models/projects/~';

const path = require('path');
// const _ = require('underscore');
const mongoose = require('mongoose');
// const uuidv4 = require('uuid/v4');

require(path.join(__base, 'utils/object'));
const projectSchema = require(path.join(__base, 'mongoose/projects/schema')).projectSchema;

function Projects() {
  this.name = "Projects Object";
    
  this.getProjectModel = () => {
	  return mongoose.model('Project', projectSchema);
  };
}

module.exports = Projects;