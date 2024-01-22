import express from 'express';
import experienceController from '../controller/experienceController.js';

export const routerExperience = express.Router()

routerExperience.route('/experience')
    .post(experienceController.post)

// METHOD BY ID
routerExperience.route('/experience/:id')
    .put(experienceController.put) // update by id
    .delete(experienceController.remove); // remove by id