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
