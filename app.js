import express from "express";
import cookieParser from "cookie-parser";


import { routerProfile } from "./src/router/profile";
import { routerEducation } from "./src/router/education";
import { routerSkill } from "./src/router/skill";
import { routerBlog } from "./src/router/blog";
import { routerProject } from "./src/router/project";
import { routerAuth } from "./src/router/auth";
import { notFound } from "./src/router/middleware/notfound";
import { logging } from "./src/router/middleware/logging";

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json())

//untuk membaca cookies
app.use(cookieParser())

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

//MIDDLEWARE UNTUK PATH ASING/ UNKNOWN PAGE
app.use(notFound);

app.listen(5000, () => {
    console.info("App is running in http://localhost:5000");
})