const get = (req, res) => {
    // ambil data dari database;
    const data = {
        firstname: "john",
        lastname: "doe",
        email: "johndoe@gmail.com",
        age: 18
    };

    res.status(200).json({
        messege: "berhasil ambil data blog",
        data: data
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA blog
const post = (req, res) => {
    res.send('<p>Halaman untuk menyimpan data</p>')
}

// PATH : METHOD UNTUK MENYIMPAN DATA blog
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data blog sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA blog
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data blog seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA blog
const remove = (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data blog"
    });
}

export default {
    get,
    post,
    patch,
    put,
    remove
}