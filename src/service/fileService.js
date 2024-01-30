import fs from 'fs/promises';
import multer from 'multer';

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


const createFolder = async (folderName) => {
    try {
        // coba akses folder
        await fs.access(folderName);
    } catch (error) {
        // kalo gagal, maka buat folder
        await fs.mkdir(folderName);

    }
}

const removeFile = async (file) => {
    try {
        await fs.rm('./' + file);
    } catch (error) {
        // throw (error);
    }
}

export default {
    createFolder,
    removeFile,
    upload
}