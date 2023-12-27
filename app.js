import express from "express";
import cookieParser from "cookie-parser";


import { routerProfile } from "./src/profile";
import { routerEducation } from "./src/education";
import { routerSkill } from "./src/skill";
import { routerBlog } from "./src/blog";
import { routerProject } from "./src/project";
import { routerAuth } from "./src/auth";

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json())

//untuk membaca cookies
app.use(cookieParser())

//belajar middleware => logging
app.use((req, res, next) => {
    let time = new Date().toLocaleDateString();
    const log = {
        time: new Date(),
        path: req.path,
        method: req.method,
        query: req.query,
        cookies: req.cookies,
        protocol: req.protocol,
        body: req.body
    }
    console.info(log)

    // save to database
    console.log('==============')
    console.log('waiting to save log to database')
    next()
})

app.get('/', (req, res) => {
    // res.send('<i>Hello World Miring</i>')

    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
            })
        },
    });
});

// PATH: METHOD GET UNTUK HOMEPAGE
app.get('/home/', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data homepage"
    })
})

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
app.use((req, res) => {
    res.status(404).json({
        messege: "Halaman tidak di temukan"
    });
});

app.listen(5000, () => {
    console.info("App is running in http://localhost:5000");
})