import express from "express";
import cookieParser from "cookie-parser";

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json())

//untuk membaca cookies
app.use(cookieParser())

//belajar middleware => logging
app.use((req, res, next) => {
    let time = new Date().toLocaleDateString();
    const log = {
        time: new Date(),
        path: req.path,
        method: req.method,
        query: req.query,
        cookies: req.cookies,
        protocol: req.protocol,
        body: req.body
    }
    console.info(log)

    // save to database
    console.log('==============')
    console.log('waiting to save log to database')
    next()
})

app.get('/', (req, res) => {
    // res.send('<i>Hello World Miring</i>')

    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
            })
        },
    });
});

// PATH: METHOD GET UNTUK HOMEPAGE
app.get('/home/', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data homepage"
    })
})

// PATH: METHOD GET UNTUK PROFILE
app.get('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data profile"
    });
});

// PATH: METHOD POST UNTUK PROFILE
app.post('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data profile"
    });
});

// PATH: METHOD PUT UNTUK PROFILE
app.put('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebagian data profile"
    });
});

// PATH: METHOD PATCH UNTUK PROFILE
app.patch('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data profile"
    });
});

// PATH: METHOD DELETE UNTUK PROFILE
app.delete('/profile/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data profile"
    });
});


// PATH: METHOD GET UNTUK EDUCATION
app.get('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data education"
    });
});

// PATH: METHOD POST UNTUK EDUCATION
app.post('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data education"
    });
});

// PATH: METHOD PUT UNTUK EDUCATION
app.put('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebagian data education"
    });
});

// PATH: METHOD PATCH UNTUK EDUCATION
app.patch('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data education"
    });
});

// PATH: METHOD DELETE UNTUK EDUCATION
app.delete('/education/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data education"
    });
});


// PATH: METHOD UNTUK CONTACT
app.get('/contact/:id', (req, res) => {
    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                path: req.path
            })
        },
    });
});

//PATH: METHOD POST UNTUK CONTACT
app.post('/contact/:id', (req, res) => {
    res.send('<p>Halaman Contact Method Post</p>')
});

//PATH: METHOD PATCH UNTUK CONTACT
app.patch('/contact/:id', (req, res) => {
    res.send('<p>Halaman Contact untuk mengubah sebagian data</p>')
});

//PATH: METHOD PUT UNTUK CONTACT
app.put('/contact/:id', (req, res) => {
    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                path: req.path,
                params: req.params
            })
        },
    });
});

//PATH: METHOD DELETE UNTUK CONTACT
app.delete('/contact/:id', (req, res) => {
    res.send('<p>Halaman Contact untuk menghapus data</p>')
});


// PATH: METHOD GET UNTUK PROJECT
app.get('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data project"
    });
});

// PATH: METHOD POST UNTUK PROJECT
app.post('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data project"
    });
});

// PATH: METHOD PUT UNTUK PROJECT
app.put('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mnegupdate sebagian data project"
    });
});

// PATH: METHOD PATCH UNTUK PROJECT
app.patch('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data project"
    });
});

// PATH: METHOD DELETE UNTUK PROJECT
app.delete('/project/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data project"
    });
});



// PATH: METHOD GET UNTUK PROJECT
app.get('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data skill"
    });

});

// PATH: METHOD POST UNTUK SKILL
app.post('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menyimpan data skill"
    });
});

// PATH: METHOD PUT UNTUK SKILL
app.put('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebagian data skill"
    });
});

// PATH: METHOD PATCH UNTUK SKILL
app.patch('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate keseluruhan data skill"
    });
});

// PATH: METHOD DELETE UNTUK SKILL
app.delete('/skill/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data skill"
    });
});


// PATH: METHOD GET UNTUK BLOG
app.get('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mendapat data blog"
    });
});

// PATH: METHOD POST UNTUK BLOG
app.post('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berasil menyimpan data blog"
    });
});

// PATH: METHOD PUT UNTUK BLOG
app.put('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate sebgian data blog"
    });
});

// PATH: METHOD PATCH UNTUK BLOG
app.patch('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil mengupdate seluruh data blog"
    });
});

// PATH: METHOD DELETE UNTUK BLOG
app.delete('/blog/:id', (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data blog"
    });
});


app.get('/about', (req, res) => {
    // res.send('<p>Halaman About</p>')
});

app.post('/login', (req, res) => {
    // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
    res.cookie("token", "abcdefghijklmnopqrstuvwxyz");
    res.cookie("username", "husnataqiyya");
    res.cookie("lokasi", "jakarta");

    res.status(200).json({
        messege: "Anda berhasil login"
    })
})

//PATH: METHOD DELETE
app.delete('/logout', (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        messege: "Semua data di cookie berhasil di hapus"
    });
});

//MIDDLEWARE UNTUK PATH ASING/ UNKNOWN PAGE
app.use((req, res) => {
    res.status(404).json({
        messege: "Halaman tidak di temukan"
    });
});

app.listen(5000, () => {
    console.info("App is running in http://localhost:5000");
})