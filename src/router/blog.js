import express from 'express';
import blogController from '../controller/blogController.js';

export const routerBlog = express.Router()

// SEMUA ROUTE PATH BUTUH CHECK AUTHENTICATION


// update title only
routerBlog.patch('/update_blog_title/:id', blogController.updateTitle)

// save new blog
routerBlog.post('/blog', blogController.post);

routerBlog.route('/blog/:id')
    .put(blogController.put) // update by id
    .delete(blogController.remove); // remove by id
