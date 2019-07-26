const moduleName = 'routes.js';

const fs = require('fs');
const path = require('path');

const setup = app => {
  const normalizedPath = path.join(__base, 'routes/apis');

  fs.readdirSync(normalizedPath).forEach(file => {
    if (~file.indexOf('.js')) {
      const routes = require(path.join(__base, 'routes/apis/') + file);
      routes.setup(app);
    }
  });
};
exports.setup = setup;