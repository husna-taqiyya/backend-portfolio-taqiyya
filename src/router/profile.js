import express from 'express';
import profileController from '../controller/profileController.js';

import multer from 'multer';

// const upload = multer({ dest: 'uploads/' })

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

const upload = multer({ storage: storage })

export const routerProfile = express.Router()

// update profile
routerProfile.put('/profile', upload.single('avatar'), profileController.put);
