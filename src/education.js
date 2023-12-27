import express from 'express';

const routerEducation = express.Router()

// COPY SEMUA METHOD DISINI

// PATH: METHOD GET UNTUK EDUCATION
routerEducation.get('/education', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data education"
    });
});

// PATH: METHOD POST UNTUK EDUCATION
routerEducation.post('/education', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data education"
    });
});

// PATH: METHOD PUT UNTUK EDUCATION
routerEducation.put('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebagian data education"
    });
});

// PATH: METHOD PATCH UNTUK EDUCATION
routerEducation.patch('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data education"
    });
});

// PATH: METHOD DELETE UNTUK EDUCATION
routerEducation.delete('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data education"
    });
});

export { routerEducation }