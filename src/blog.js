import express from 'express';

const routerBlog = express.Router()

// COPY SEMUA METHOD DISINI

// PATH: METHOD GET UNTUK BLOG
routerBlog.get('/blog', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data blog"
    });
});

// PATH: METHOD POST UNTUK BLOG
routerBlog.post('/blog', (req, res) => {
    res.status(200).json({
        messege: "berasil menyimpan data blog"
    });
});

// PATH: METHOD PUT UNTUK BLOG
routerBlog.put('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebgian data blog"
    });
});

// PATH: METHOD PATCH UNTUK BLOG
routerBlog.patch('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate seluruh data blog"
    });
});

// PATH: METHOD DELETE UNTUK BLOG
routerBlog.delete('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data blog"
    });
});

export { routerBlog }