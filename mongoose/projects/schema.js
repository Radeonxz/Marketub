const moduleNam = 'mongoose/projects/schema/~';

const path = require('path');

const config = require(path.join(__base, 'config/config'));
const Schema = require('mongoose').Schema;
const plugins = require(path.join(__base, 'utils/plugins'));

const projectOptions = config.mongodb.schemaOptions;

const projectSchema = new Schema(
  {
    owner_id: { type: Number, required: true },
    project_id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    skill_sets: { type: Array, default: [], required: false },
    timestamp: { type: String, required: true },
    site_link: { type: String, default: null, required: false },
    github_link: { type: String, default: null, required: false },
    screenshot: { type: String, required: false },
    likes: [{ type: String, default: [], required: false }]
  },
  projectOptions
);
projectSchema.plugin(plugins.modifiedOn);
exports.projectSchema = projectSchema;
