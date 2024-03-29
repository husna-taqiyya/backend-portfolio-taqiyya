import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import fs from 'fs/promises';

import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerSkill } from "./src/router/skill.js";
import { routerBlog } from "./src/router/blog.js";
import { routerProject } from "./src/router/project.js";
import { routerAuth } from "./src/router/auth.js";
import { notFound } from "./src/middleware/notfound.js";
import { logging } from "./src/middleware/logging.js";
import { errorMiddleware } from './src/middleware/errorMiddleware.js';
import { authMiddleware } from './src/middleware/authMiddleware.js';
import { routerPublic } from './src/router/public.js';
import { routerExperience } from './src/router/experience.js';
import fileService from './src/service/fileService.js';

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json());

//untuk membaca cookies
app.use(cookieParser());

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// SET STATIC FILES
app.use('/uploads', express.static('./uploads'));
// handle file not exist
app.use('/uploads', async (req, res) => {
    try {
        await fs.access('/uploads' + req.url)
    } catch (error) {
        res.status(404).json({
            message: "file not found"
        })
    }
});

//belajar middleware => logging
app.use(logging);

// CREATE FOLDER UPLOADS
fileService.createFolder('./uploads');


// PUBLIC API / TANPA LOGIN
app.use(routerPublic);

// MIDDLEWARE TO CHECK AUTHENTICATION
app.use(authMiddleware);
// ROUTER PROFILE
app.use(routerProfile);

// ROUTER EDUCATION
app.use(routerEducation);

// ROUTER SKILL
app.use(routerSkill);

// ROUTER BLOG
app.use(routerBlog);

// ROUTER PROJECT
app.use(routerProject);

// ROUTER AUTH
app.use(routerAuth);

// ROUTER EXPERIENCE
app.use(routerExperience);

//MIDDLEWARE 404
app.use(notFound);

// MIDDLEWARE ERROR
app.use(errorMiddleware);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.info("App is running in http://localhost:" + port);
});