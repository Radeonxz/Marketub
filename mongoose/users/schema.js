const moduleNam = "mongoose/users/schema/~";

const path = require("path");

const config = require(path.join(__base, "config/config"));
const Schema = require("mongoose").Schema;
const plugins = require(path.join(__base, "utils/plugins"));

const userOptions = config.mongodb.schemaOptions;

const projrctsArrSchema = new Schema(
  {
    project_id: { type: String, required: false, validate: plugins.valGUID }
  },
  userOptions
);
projrctsArrSchema.plugin(plugins.modifiedOn);
exports.projrctsArrSchema = projrctsArrSchema;

const UserSchema = new Schema(
  {
    account_info: {
      user_id: {
        type: String,
        required: true,
        unique: true,
        validate: plugins.valGUID
      },
      role_id: { type: Number, default: 1, required: true }
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    github_link: { type: String, default: null, required: false },
    projects_array: { type: [projrctsArrSchema], required: false },
    account_status: {
      email_confirmed: { type: Boolean, default: false, required: true },
      email_confirm_token: {
        type: String,
        default: null,
        required: false,
        unique: true
      },
      email_confirm_expires: { type: Date, default: null, required: false },
      reset_password_token: {
        type: String,
        default: null,
        required: false,
        unique: true
      },
      reset_password_expires: { type: Date, default: null, required: false }
    }
  },
  userOptions
);
UserSchema.plugin(plugins.modifiedOn);

exports.UserSchema = UserSchema;
