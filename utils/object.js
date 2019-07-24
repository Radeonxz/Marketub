const moduleName = 'utils/object';

// Common part of the error message
StatusErr = {
	'status': 'error',
	'data': {
    level: 'ERR',
    code: 403,
    details: ''
	}
};

const _objectIdDel = ObjectWithId => {
  // http://www.connecto.io/blog/deep-copyingcloning-of-mongoose-object/
  if (ObjectWithId != null 
    && typeof ObjectWithId != 'string' 
    && typeof ObjectWithId != 'number' 
    && typeof ObjectWithId != 'boolean') {

    if (typeof ObjectWithId.length  == 'undefined') {
      // It is not an array because array length is defined
      delete ObjectWithId._id;
      delete ObjectWithId.__v;
        
      for (var key in ObjectWithId) {
        //recursive del calls on object elements
        _objectIdDel(ObjectWithId[key]);
      }
    } else {
      // process all array members
      for (var i = 0; i < ObjectWithId.length; i++) {
        //recursive del calls on array elements
        _objectIdDel(ObjectWithId[i]);
      }
    }
  }
};

const objectIdDel = ObjectWithId => {
  const copiedObject = JSON.parse(JSON.stringify(ObjectWithId));
  _objectIdDel(copiedObject); 

  return copiedObject;
};