const path = require('path');
const validate 	= require('express-validation');

const Projects = require(path.join(__base, 'controllers/projects'));
const Authn = require(path.join(__base, 'middlewares/authentication'));
const Authr = require(path.join(__base, 'middlewares/authorization'));

const setup = app => {
    app.get('/api/project/:id', Authn, Authr, Projects.getProject);
    app.post('/api/project', Authn, validate(Projects.postProjectSchema), Projects.postProject);
    // app.put('/api/project', Projects.postUsers);
    // app.delete('/api/project/:id', Projects.deleteProject);
};
exports.setup = setup;