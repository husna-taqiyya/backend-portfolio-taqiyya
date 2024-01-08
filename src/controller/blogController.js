import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';


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
        id = Validate(isID, id);

        const blog = await Prisma.blog.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (blog == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        res.status(200).json({
            messege: "berhasil mendapat data blog berdasarkan id = " + id,
            data: blog
        }); ''

    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const post = async (req, res, next) => {
    try {
        let blog = req.body;

        // BLOG VALIDATE
        blog = Validate(isBlog, blog)

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

        id = Validate(isID, id);

        // BLOG VALIDATE
        blog = Validate(isBlog, blog)

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        const updateData = await Prisma.blog.update({
            where: {
                id: id
            },
            data: updateData
        });

        res.status(200).json({
            messege: "berhasil menyimpan data blog",
            data: updateData
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

        id = Validate(isID, id);

        title = Validate(isBlogTitle, title)

        // END VALIDATE BLOG 

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

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
        next(error);
    }
}


// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        // END VALIDATE ID

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

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