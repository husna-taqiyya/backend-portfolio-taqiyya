import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";


import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerSkill } from "./src/router/skill.js";
import { routerBlog } from "./src/router/blog.js";
import { routerProject } from "./src/router/project.js";
import { routerAuth } from "./src/router/auth.js";
import { notFound } from "./src/middleware/notfound.js";
import { logging } from "./src/middleware/logging.js";
import Joi from 'joi';

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json());

//untuk membaca cookies
app.use(cookieParser());

//belajar middleware => logging
app.use(logging);

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

//MIDDLEWARE 404
app.use(notFound);

// MIDDLEWARE ERROR
app.use((error, req, res, next) => {
    if (!error) {
        return next();
    }

    // JOI VALIDATION ERROR
    if (error instanceof Joi.ValidationError) {
        return res.status(400).json({
            message: error.message
        }).end();
    }

    // SERVER ERROR
    res.status(500).json({
        messege: "Server error :" + error.messege
    }); end();

});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.info("App is running in http://localhost:" + port);
});