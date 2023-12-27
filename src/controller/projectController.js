const get = (req, res) => {
    // ambil data dari database;
    const data = {
        firstname: "john",
        lastname: "doe",
        email: "johndoe@gmail.com",
        age: 18
    };

    res.status(200).json({
        messege: "berhasil ambil data project",
        data: data
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const post = (req, res) => {
    res.send('<p>Halaman untuk menyimpan data</p>')
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data project sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data project seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const remove = (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data project"
    });
}

export default {
    get,
    post,
    patch,
    put,
    remove
}