import express from 'express';

const routerProfile = express.Router()

// COPY SEMUA METHOD DISINI

// PATH: METHOD GET UNTUK PROFILE
routerProfile.get('/profile', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data profile"
    });
});

// PATH: METHOD POST UNTUK PROFILE
routerProfile.post('/profile', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data profile"
    });
});

// PATH: METHOD PUT UNTUK PROFILE
routerProfile.put('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebagian data profile"
    });
});

// PATH: METHOD PATCH UNTUK PROFILE
routerProfile.patch('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data profile"
    });
});

// PATH: METHOD DELETE UNTUK PROFILE
routerProfile.delete('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data profile"
    });
});

export { routerProfile }