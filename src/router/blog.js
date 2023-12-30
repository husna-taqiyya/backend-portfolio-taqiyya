import express from 'express';
import blogController from '../controller/blogController.js';

export const routerBlog = express.Router()

// routerBlog.route('/blog')
//     .get(blogController.get)
//     .post(blogController.post);

//get all blogs
routerBlog.get('/blogs', blogController.getAll);
// get blog by id
routerBlog.get('/blog/:id', blogController.get);
// save new blog
routerBlog.get('/blog', blogController.post);


routerBlog.route('/blog/:id')
    .put(blogController.put)
    .patch(blogController.patch)
    .delete(blogController.remove); 