import { Prisma } from '../application/prisma.js';


// PATH: METHOD GET UNUTK BLOG
const get = async (req, res) => {
    const blog = await Prisma.blog.findMany();

    res.status(200).json({
        messege: "berhasil mendapat data blog",
        blog: blog
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