const moduleNam = 'mongoose/users/schema/~';

const path = require('path');

const config = require(path.join(__base, 'config/config'));
const Schema = require('mongoose').Schema;
const plugins = require(path.join(__base, 'utils/plugins'));

const userOptions = config.mongodb.schemaOptions;

const projrctsArrSchema = new Schema({
  project_id : { type: Number, required: false },
}, userOptions);
projrctsArrSchema.plugin(plugins.modifiedOn);
exports.projrctsArrSchema = projrctsArrSchema;

const UserSchema = new Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  github_link: { type: String, default: null, required: false },
  projects_array: { type: [projrctsArrSchema], required: false },
  is_first_login: { type: Boolean, default: true, required: true },
  first_login_token: { type: String, default: null, required: false, unique: true },
  first_login_expires: { type: Date, default: null, required: false },
  reset_password_token: { type: String, default: null, required: false, unique: true },
  reset_password_expires: { type: Date, default: null, required: false }
}, userOptions);
UserSchema.plugin(plugins.modifiedOn);

exports.UserSchema = UserSchema;