import express from 'express';
import profileController from '../controller/profileController.js';
import fileService from '../service/fileService.js';

export const routerProfile = express.Router()

// update profile
routerProfile.put('/profile', fileService.upload.single('avatar'), profileController.put);
