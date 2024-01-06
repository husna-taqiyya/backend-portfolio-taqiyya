import express from "express";
import blogController from "../controller/blogController.js";
import authController from "../controller/authController.js";
import profileController from "../controller/profileController.js";
import educationController from "../controller/educationController.js";

export const routerPublic = express.Router();
// untuk login
routerPublic.post('/login', authController.login);


//get all blogs
routerPublic.get('/blogs', blogController.getAll);
// get blog by id
routerPublic.get('/blog/:id', blogController.get);

// EDUCATION
routerPublic.get('/educations', educationController.getAll); // get by id
routerPublic.get('/education/:id', educationController.get);

// PROFILE
routerPublic.get('/profile', profileController.get);

// PROJECT

// SKILL