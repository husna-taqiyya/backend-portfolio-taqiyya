import express from 'express';
import educationController from '../controller/educationController.js';

export const routerEducation = express.Router()

routerEducation.route('/education')
    .post(educationController.post)
    .patch(educationController.patch);


// METHOD BY ID
routerEducation.route('/education/:id')
    .put(educationController.put) // update by id
    .get(educationController.get) // get by id
    .delete(educationController.remove); // remove by id