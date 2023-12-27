const get = (req, res) => {
    // ambil data dari database;
    const data = {
        firstname: "john",
        lastname: "doe",
        email: "johndoe@gmail.com",
        age: 18
    };

    res.status(200).json({
        messege: "berhasil ambil data education",
        data: data
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const post = (req, res) => {
    res.send('<p>Halaman untuk menyimpan data</p>')
}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data education sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data education seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const remove = (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data education"
    });
}

export default {
    get,
    post,
    patch,
    put,
    remove
}