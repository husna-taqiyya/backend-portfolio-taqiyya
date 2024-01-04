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
import jwt from 'jsonwebtoken';
import { Prisma } from './src/application/prisma.js';

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
app.use(async (req, res, next) => {
    console.log("enter route blog middleware ===========")
    try {
        // check cookie token;
        const token = req.cookies.token;
        console.log("token ============")
        // jika token tidak ada, maka return 401
        if (!token) throw new Error();
        console.log("token2 ============")

        // check siapa pemilik token
        const user = await Prisma.user.findFirst({
            where: {
                token: token
            },
            select: {
                name: true,
                email: true,
                token: true
            }
        });

        console.log("user")

        if (!user) {
            // clear cookie agar tdk dipaki lagi
            res.clearCookie("token");

            // jika token tidak ada, maka return 401
            if (!user) throw new Error();
        }
        // ini kalau user ada
        // check token apakah masih verify menggunakan jwt
        const jwtSecret = "TOKENTAQIYYA";
        const verifyToken = jwt.verify(token, jwtSecret);

        if (!verifyToken) {
            // clear cookie supaya gak dipake lagi 
            res.clearCookie('token');

            return res.status(401).json({
                message: "Unauthorized, you must login first"
            });
        }


        // kalo OK next

        // kalo TIDAK OKE maka return 401 / 

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, you must login first"
        });
    }
});
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