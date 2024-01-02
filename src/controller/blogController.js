import Joi from 'joi';
import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';


// PATH: METHOD GET UNTUK BLOG
const getAll = async (req, res, next) => {
    try {
        // FIND MANY -> ambil semua blog
        const blogs = await Prisma.blog.findMany();

        res.status(200).json({
            messege: "berhasil mendapat data blog",
            blogs: blogs
        });
    } catch (error) {
        next();
    }
}

// GET BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        const schema = Joi.number().positive().required().label("ID");
        id = Validate(schema, id);

        const blog = await Prisma.blog.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (blog == null) {
            return res.status(404).json({
                message: `Blog ${id} tidak ditemukan`
            });

        }

        res.status(200).json({
            messege: "berhasil mendapat data blog berdasarkan id = " + id,
            data: blog
        });

    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const post = async (req, res, next) => {
    try {
        let blog = req.body;

        // START: JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });

        blog = Validate(schemaBlog, blog)

        // END: JOI VALIDATE

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            messege: "berhasil menyimpan data ke blog",
            data: newBlog
        });
    } catch (error) {
        next();
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const put = async (req, res, next) => {
    try {
        let blog = req.body;
        let id = req.params.id;

        // START: VALIDATE ID
        const schema = Joi.number().min(1).positive().required().label("ID");
        id = Validate(schema, id);

        // START: VALIDATE BLOG

        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });

        blog = Validate(schemaBlog, blog)

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            messege: "berhasil menyimpan data blog",
            data: newBlog
        });
    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const updateTitle = async (req, res, next) => {
    try {
        let title = req.body.title;
        let id = req.params.id;

        // START: VALIDATE ID
        const schema = Joi.number().positive().required().label("ID");
        id = Validate(schema, id);

        // END: VALIDATE ID

        // START: VALIDATE BLOG

        const schemaTitle = Joi.string().trim().min(3).max(255).required().label("Blog Title")
        const validateTitle = schemaTitle.validate(title);

        title = Validate(schemaTitle, title)

        // END VALIDATE BLOG 

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
            data: {
                title: title
            }
        });

        res.status(200).json({
            messege: "Berhasil update title blog",
            data: updateTitle
        })

    } catch (error) {
        next();
    }
}


// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        // START : VALIDATE ID

        const schema = Joi.number().min(1).positive().required().label("ID");
        id = Validate(schema, id);

        // END VALIDATE ID

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
            // 404 blog tidak di temukan
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
        next(error);
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