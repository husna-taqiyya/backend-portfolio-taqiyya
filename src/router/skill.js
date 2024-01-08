import express from 'express';
import skillController from '../controller/skillController.js';

export const routerSkill = express.Router()

routerSkill.post('/skill', skillController.post); // create

routerSkill.route('/skill/:id')
    .put(skillController.put) // update
    .delete(skillController.remove); // remove