import { Prisma } from '../application/prisma.js';


// PATH: METHOD GET UNTUK BLOG
const getAll = async (req, res) => {
    try {
        // FIND MANY -> ambil semua blog
        const blogs = await Prisma.blog.findMany();

        res.status(200).json({
            messege: "berhasil mendapat data blog",
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            messege: "Server error :" + error.messege
        })
    }
}

// GET BY ID
const get = async (req, res) => {
    let id = req.params.id;

    if (!Number(id)) {
        return res.status(400).json({
            messege: "ID is invalid dari method number"
        });
    }

    if (isNaN(id)) {
        return res.status(400).json({
            messege: "ID is invalid  dari method isNaN"
        });
    }

    id = parseInt(id); // untuk parse ke integer

    const blog = await Prisma.blog.findUnique({
        where: {
            id: id
        }
    });

    // HANDLE NOT FOUND
    if (blog == null) {
        return res.status(404).json({
            messege: `Blog ${id} tidak ditemukan`
        });

    }

    res.status(200).json({
        messege: "berhasil mendapat data blog berdasarkan id = " + id,
        blog: blog
    });
}




// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const post = async (req, res) => {
    try {
        const blog = req.body;

        if (!blog.title || !blog.content) {
            return res.status(400).json({
                messege: "Silahkan isi title dan content"
            });
        }

        if (blog.title.length < 3) {
            return res.status(400).json({
                messege: "Title minimal 3 karakter"
            });
        }

        if (blog.content.length < 3) {
            return res.status(400).json({
                messege: "Content minimal 3 karakter"
            });
        }

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            messege: "berhasil menyimpan data blog",
            data: newBlog
        });
    } catch (error) {
        res.status(500).json({
            messege: "Server error :" + error.messege
        })
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data blog sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data blog seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
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