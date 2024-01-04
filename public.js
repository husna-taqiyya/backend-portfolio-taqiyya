import express from "express";
import blogController from "./src/controller/blogController.js";
import authController from "./src/controller/authController.js";

export const routerPublic = express.Router();
// untuk login
routerPublic.post('/login', authController.login);


//get all blogs
routerPublic.get('/blogs', blogController.getAll);
// get blog by id
routerPublic.get('/blog/:id', blogController.get) 
