const moduleName = 'authorization';

const authr = (req, res, next) => {
  const route = req.client.route.split('/')[0];
  console.log('route is', route);
  const role_id = req.client.user.account_info.role_id;
  req.client.is_admin = false;
  if(!role_id) {
    const message = 'None authorized.';
    return res.status(401).json(message);
  }

  // all users have GET access
  // admin has all access, CRUD everything...
  if(role_id === 999) {
    console.log('req is', req.method);
    req.client.is_admin = true;
    next();
  }

  // regualer user can't POST, PUT and DELETE for all routes except their own USER route
  const restrictedMethodArr = ['POST', 'PUT', 'DELETE'];
  const restrictedRouteArr = ['project'];
  if(role_id === 1) {
    if(restrictedRouteArr.includes(route) && restrictedMethodArr.includes(req.method)) {
      const message = `Regular user can't ${restrictedMethodArr}, please upgrade to premium account...`;
      return res.status(401).json(message);
    }
  }
  
  // premium users can CRUD only POST, PUT amd DELETE with their own stuff
  if(role_id === 500) {
    next();
  }
};

module.exports = authr;