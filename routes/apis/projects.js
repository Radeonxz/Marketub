const path = require('path');
const validate 	= require('express-validation');

const Projects = require(path.join(__base, 'controllers/projects'));
const auth = require(path.join(__base, 'middlewares/authentication'));

const setup = app => {
    app.get('/api/project/:id', auth, Projects.getProject);
    // app.get('/api/projects', Projects.getAllProjects);
    // app.post('/api/project', Projects.postProject);
    // app.put('/api/project', Projects.postUsers);
    // app.delete('/api/project/:id', Projects.deleteProject);
};
exports.setup = setup;