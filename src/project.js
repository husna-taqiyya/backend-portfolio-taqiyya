import express from 'express';

const routerProject = express.Router()

// COPY SEMUA METHOD DISINI

// PATH: METHOD GET UNTUK PROJECT
routerProject.get('/project', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data project"
    });
});

// PATH: METHOD POST UNTUK PROJECT
routerProject.post('/project', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data project"
    });
});

// PATH: METHOD PUT UNTUK PROJECT
routerProject.put('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mnegupdate sebagian data project"
    });
});

// PATH: METHOD PATCH UNTUK PROJECT
routerProject.patch('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data project"
    });
});

// PATH: METHOD DELETE UNTUK PROJECT
routerProject.delete('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data project"
    });
});

export { routerProject }