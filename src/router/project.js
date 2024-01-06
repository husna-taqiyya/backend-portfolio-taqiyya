import express from 'express';
import projectController from '../controller/projectController.js';

export const routerProject = express.Router()

// create
routerProject.get('/project', projectController.get);

routerProject.route('/project/:id')
    .put(projectController.put)
    .delete(projectController.remove);