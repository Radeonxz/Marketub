const moduleNam = 'utils/plugins~';

const joi = require('joi');

const GUIDvalidator = val => {
  const schema = joi
    .string()
    .guid()
    .required();
  return !joi.validate(val, schema).error ? true : false;
};
const valGUID = [{ validator: GUIDvalidator, msg: 'Invalid GUID.' }];
exports.valGUID = valGUID;

const updTime = context => {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  context.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!context.created_at) context.created_at = currentDate;
};

exports.modifiedOn = (schema, options) => {
  schema.add({ created_at: { type: Date } });
  schema.add({ updated_at: { type: Date } });

  schema.pre('save', function(next) {
    updTime(this);
    next();
  });
};
