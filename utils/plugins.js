const moduleNam = 'utils/plugins~'; 

// const joi = require('joi');

// function GUIDvalidator (val) {
//   const schema = joi.string().guid().required();
//   return (!joi.validate(val, schema).error ? true:false);
// }
// const valGUID = [{validator:GUIDvalidator, msg: 'Invalid GUID.'}];
// exports.valGUID = valGUID;

function updTime(context) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  context.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!context.created_at)
	context.created_at = currentDate;    
}

function modifiedOn (schema, options) { 
  schema.add({'created_at': { type: Date}});
  schema.add({'updated_at': { type: Date}});

  schema.pre('save', function(next) {
    updTime(this);
    next();
  });    
}
exports.modifiedOn = modifiedOn; 


// Used only for questions and sections. Users are a specific case because employees do not increase
// serialno
function updSerial (schema, options) { 
  schema.add({'serialno': { type: Number, default: 0}});

  schema.pre('save', function(next) {
    if(debug) console.log('calling schema.pre(save) updSerial');
    this.serialno++;
    next();
  });    
}
exports.updSerial = updSerial;