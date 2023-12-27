const get = (req, res) => {
    // ambil data dari database;
    const data = {
        firstname: "john",
        lastname: "doe",
        email: "johndoe@gmail.com",
        age: 18
    };

    res.status(200).json({
        messege: "berhasil ambil data profile",
        data: data
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA PROFILE
const post = (req, res) => {
    res.send('<p>Halaman untuk menyimpan data</p>')
}

// PATH : METHOD UNTUK MENYIMPAN DATA PROFILE
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data profile sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA PROFILE
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data profile seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA PROFILE
const remove = (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data profile"
    });
}

export default {
    get,
    post,
    patch,
    put,
    remove
}