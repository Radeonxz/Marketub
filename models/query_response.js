const moduleName = 'query_response '; 

const path = require('path');
require(path.join(__base, 'utils/object'));

function Query_resp() {
  this.name = 'Query_resp ';

  this.buildQueryRespA = function(respObj) {
    const fctName = moduleName + 'buildQueryRespA '; 
    const query_response = {'status': 'ok'};

    if(typeof respObj != 'object') {
      console.error(fctName, 'typeof respObj: ', typeof respObj);
      return false;
    }

    if(true) {
      const copiedWithoutIdData = objectIdDel(respObj.data);
      respObj.data = copiedWithoutIdData;
    } 

    for(const key in respObj) {
      query_response[key]= respObj[key];
    }
    
    return query_response;
  };
} 
module.exports = Query_resp;