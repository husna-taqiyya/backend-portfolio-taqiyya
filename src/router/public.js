import express from "express";
import blogController from "../controller/blogController.js";
import authController from "../controller/authController.js";
import profileController from "../controller/profileController.js";
import educationController from "../controller/educationController.js";
import projectController from "../controller/projectController.js";
import skillController from "../controller/skillController.js";
import experienceController from "../controller/experienceController.js";

export const routerPublic = express.Router();

// USER
routerPublic.post('/first_user', authController.createFirstUser)
routerPublic.get('/is_user_exist', authController.isUserExist)

// untuk login
routerPublic.post('/login', authController.login);

// get all blogs
routerPublic.get('/blogs', blogController.getAll);
// get blog by id
routerPublic.get('/blog/:id', blogController.get);

// EDUCATION
routerPublic.get('/educations', educationController.getAll); // get by id
routerPublic.get('/education/:id', educationController.get);

// PROFILE
routerPublic.get('/profile', profileController.get);
routerPublic.get('/portfolio', profileController.portfolio);

// PROJECT
routerPublic.get('/projects', projectController.getAll);
routerPublic.get('/project/:id', projectController.get);


// EXPERIENCE
routerPublic.get('/experiences', experienceController.getAll); // get All
routerPublic.get('/experience/:id', experienceController.get); // get 

// SKILL
routerPublic.get('/skills', skillController.getAll); // get All
routerPublic.get('/skill/:id', skillController.get); // get 
routerPublic.get('/skill_by_category', skillController.getSkillByCategory);

// GET ALL CATEGORY
routerPublic.get('/skill_categories', skillController.getAllCategory);