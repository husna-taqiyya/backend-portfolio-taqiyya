import express from 'express';
import blogController from '../controller/blogController.js';
import multer from 'multer';

export const routerBlog = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // date + random numer with date
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        //get file extention
        const ext = file.originalname.split('.').pop();

        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);

    }
});

const upload = multer({ storage: storage });

// update profile
routerBlog.post('/blog', upload.array('photos', 10), blogController.post);

// update title only
routerBlog.patch('/update_blog_title/:id', blogController.updateTitle)

// update blog + photo
routerBlog.put('/blog/:id', upload.array('photos', 10), blogController.put) // update by id

// delete 
routerBlog.delete('/blog/:id', blogController.remove); // remove by id
