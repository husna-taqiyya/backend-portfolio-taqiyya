import Joi from 'joi';
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
    try {
        let id = req.params.id;

        const schema = Joi.number().min(1).positive().required().label("ID");
        const validation = schema.validate(id);

        if (validation.error) {
            return restart.status(400).json({
                message: validation.error.message
            });
        }

        id = validation.value;

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

    } catch (error) {
        res.status(500).json({
            messege: "Server error :" + error.messege
        });
    }
}



// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const post = async (req, res) => {
    try {
        const blog = req.body;
        // START: JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });

        const validateBlog = schemaBlog.validate(blog, {
            abortEarly: false
        });

        if (validateBlog.error) {
            return restart.status(400).json({
                message: validateBlog.error.message
            });
        }

        // END: JOI VALIDATE

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            messege: "berhasil update data keseluruhan blog",
            data: updateData
        });
    } catch (error) {
        res.status(500).json({
            messege: "Server error :" + error.messege
        });
    }
}



// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const put = async (req, res) => {
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
const updateTitle = async (req, res) => {
    try {
        const blog = req.body;
        let id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({
                messege: "ID is invalid  dari method isNaN"
            });
        }
        id = parseInt(id); // untuk parse ke integer

        if (!blog.title) {
            return res.status(400).json({
                messege: "Silahkan isi title"
            });
        }

        if (blog.title.length < 3) {
            return res.status(400).json({
                messege: "Title minimal 3 karakter"
            });
        }

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) {
            // check apakah id tersebut ada di database di table blog
            // 4040 blog tidak di temukan
            return res.status(404).json({
                messege: `Blog dengan id ${id} tidak ditemukan`
            })
        }

        // EKSEKUSI PATCH
        const updateTitle = await Prisma.blog.update({
            where: { id: id },
            data: blog
        });

        res.status(200).json({
            messege: "Behasil update title blog",
            data: updateTitle
        })

    } catch (error) {
        res.status(500).json({
            messege: "Server error :" + error.messege
        });
    }
}


// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const remove = async (req, res) => {
    try {
        let id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({
                messege: "ID is invalid  dari method isNaN"
            });
        }
        id = parseInt(id); // untuk parse ke integer 

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) {
            // check apakah id tersebut ada di database di table blog
            // 4040 blog tidak di temukan
            return res.status(404).json({
                messege: `Blog dengan id ${id} tidak ditemukan`
            })
        }

        // EKSEKUSI DELETE

        await Prisma.blog.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            messege: "Berhasil menghapus data blog"
        });
    } catch (error) {
        res.status(500).json({
            messege: "Server error :" + error.messege
        })
    }
}

export default {
    getAll,
    get,
    post,
    updateTitle,
    put,
    remove
}