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
import { ResponseError } from './src/error/responseError.js';
import { errorMiddleware } from './src/middleware/errorMiddleware.js';
import { routerPublic } from './public.js';

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json());

//untuk membaca cookies
app.use(cookieParser());

//belajar middleware => logging
app.use(logging);

// PUBLIC API / TANPA LOGIN
app.use(routerPublic);

// MIDDLEWARE TO CHECK AUTHENTICATION
app.use(((req, res, next) => {
    console.log("enter route blog middleware ===========")
    // check cookie token;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, you must login first!"
        });
    }
    console.log(token);


    // check siapa pemilik token

    // check token apakah masih verify

    // kalo OK next

    // kalo TIDAK OKE maka return 401 / 

    next();
}));

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
app.use(errorMiddleware);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.info("App is running in http://localhost:" + port);
});