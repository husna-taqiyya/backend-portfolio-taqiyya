import { Prisma } from '../application/prisma.js';


// PATH: METHOD GET UNUTK BLOG
const getAll = async (req, res) => {
    const blogs = await Prisma.blog.findMany();

    res.status(200).json({
        messege: "berhasil mendapat data blog",
        blogs: blogs
    });
}

// GET BY ID
const get = async (req, res) => {
    let id = req.params.id;
    id = parseInt(id); // untuk parse ke integer

    const blog = await Prisma.blog.findUnique({
        where: {
            id: id
        }
    });

    res.status(200).json({
        messege: "berhasil mendapat data blog berdasarkan id = " + id,
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
    getAll,
    get,
    post,
    patch,
    put,
    remove
}