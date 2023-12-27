const get = (req, res) => {
    // ambil data dari database;
    const data = {
        firstname: "john",
        lastname: "doe",
        email: "johndoe@gmail.com",
        age: 18
    };

    res.status(200).json({
        messege: "berhasil ambil data skill",
        data: data
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const post = (req, res) => {
    res.send('<p>Halaman untuk menyimpan data</p>')
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data skill sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data skill seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const remove = (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data skill"
    });
}

export default {
    get,
    post,
    patch,
    put,
    remove
}