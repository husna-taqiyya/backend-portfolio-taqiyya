import express from "express";
import cookieParser from "cookie-parser";

//deskripsi aplikasi express
const app = express();

//untuk membaca json dari body
app.use(express.json())

//untuk membaca cookies
app.use(cookieParser())

app.get('/',  (req, res) => {
    // res.send('<i>Hello World Miring</i>')

    res.status(200).format({
        json:  () => {
            res.send({
                ip: req.ip,
                query: req.query,
            })
        },
    });
});

app.get('/contact',  (req, res) => {
    // res.send('<p>Halaman Contact</p>')

    res.status(200).format({
        json:  () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                path: req.path
            })
        },
    });
});

app.post('/contact',  (req, res) => {
    res.send('<p>Halaman Contact Method Post</p>')
});

app.put('/contact/:id',  (req, res) => {
    res.status(200).format({
        json:  () => {
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

app.delete('/contact',  (req, res) => {
    res.send('<p>Halaman Contact untuk menghapus data</p>')
});

app.patch('/contact',  (req, res) => {
    res.send('<p>Halaman Contact untuk mengubah sebagian data</p>')
});


app.get('/about',  (req, res) => {
    // res.send('<p>Halaman About</p>')
});

app.get('/project',  (req, res) => {
    // res.send('<p>Halaman Project</p>')
    
    res.status(200).json({
        cookies: req.cookies,
        test: "data test"
    })

});

app.get('/blog',  (req, res) => {
    res.send('<p>Halaman Blog</p>')
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

app.delete('/logout', (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        messege: "Semua data di cookie berhasil di hapus"
    })
})

app.listen(5000,  () => {
    console.info("App is running in http://localhost:5000")
})