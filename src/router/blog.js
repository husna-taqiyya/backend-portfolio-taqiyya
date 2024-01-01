import express from 'express';
import blogController from '../controller/blogController.js';

export const routerBlog = express.Router()

// routerBlog.route('/blog')
//     .get(blogController.get)
//     .post(blogController.post);

//get all blogs
routerBlog.get('/blogs', blogController.getAll);

// update title only
routerBlog.patch('/update_blog_title/:id', blogController.updateTitle)

// save new blog
routerBlog.get('/blog', blogController.post);


routerBlog.route('/blog/:id')
    .get(blogController.get) // get by id
    .put(blogController.put) // update by id
    .delete(blogController.remove); // remove by id
