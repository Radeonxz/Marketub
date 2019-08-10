const path = require('path');
const validate 	= require('express-validation');

const Projects = require(path.join(__base, 'controllers/projects'));
const Authn = require(path.join(__base, 'middlewares/authentication'));
const Authr = require(path.join(__base, 'middlewares/authorization'));
const Upload = require(path.join(__base, 'middlewares/uploadFile'));

exports.setup = app => {
    app.get('/api/project/:id', /*Authn, Authr,*/ Projects.getProject);
    app.post('/api/project', Authn, Authr, Upload.single('screenshot'), validate(Projects.postProjectSchema), Projects.postProject);
    app.put('/api/project/:id', Authn, Authr, Upload.single('screenshot'), validate(Projects.putProjectSchema), Projects.putProject);
    app.delete('/api/project/:id', Authn, Authr, Projects.deleteProject);
};