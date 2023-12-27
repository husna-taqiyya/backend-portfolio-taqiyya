import express from 'express';

const routerSkill = express.Router()

// COPY SEMUA METHOD DISINI

// PATH: METHOD GET UNTUK PROJECT
routerSkill.get('/skill', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data skill"
    });

});

// PATH: METHOD POST UNTUK SKILL
routerSkill.post('/skill', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data skill"
    });
});

// PATH: METHOD PUT UNTUK SKILL
routerSkill.put('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebagian data skill"
    });
});

// PATH: METHOD PATCH UNTUK SKILL
routerSkill.patch('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data skill"
    });
});

// PATH: METHOD DELETE UNTUK SKILL
routerSkill.delete('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data skill"
    });
});


export { routerSkill }