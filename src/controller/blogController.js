import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';
import dayjs from 'dayjs';

const formatData = (blog) => {
    const date = blog.createdAt;
    blog.readDateTime = dayjs(date).format('DD MMMM YYYY HH:mm:ss');
    blog.shortDateTime = dayjs(date).format('D MMM YYYY HH:mm')

}

// PATH: METHOD GET UNTUK BLOG
const getAll = async (req, res, next) => {
    try {
        // PAGE
        const page = parseInt(req.query.page) || 1;

        // LIMIT
        const limit = parseInt(req.query.limit) || 10;

        // get total data
        const { data, total } = await getByPage(page, limit);
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            messege: "berhasil mendapat data blog",
            data,
            total,
            page,
            limit,
            maxPage
        });

    } catch (error) {
        next(error);
    }
}

const getByPage = async (page = 1, limit = 10) => {
    // SKIP
    const skip = (page - 1) * limit;

    const data = await Prisma.blog.findMany({
        take: limit,
        skip: skip
    });

    // format data to get readable date time
    for (const blog of data) {
        formatData(blog);
    }

    //get total data
    const total = await Prisma.blog.count();

    return {
        data,
        total
    }
}

// GET BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const data = await Prisma.blog.findUnique({
            where: { id }
        });

        // HANDLE NOT FOUND
        if (data == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        formatData(data);

        res.status(200).json({
            messege: "berhasil mendapat data blog berdasarkan id = " + id,
            data
        });

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
        next(error);
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
            where: { id },
            select: { id: true }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        formatData(data);

        const updateData = await Prisma.blog.update({
            where: { id },
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
            where: { id },
            select: { id: true }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        formatData(data);

        // EKSEKUSI PATCH
        const updateTitle = await Prisma.blog.update({
            where: { id },
            data: { title }
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
            where: { id },
            select: { id: true }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        formatData(data);

        // EKSEKUSI DELETE
        await Prisma.blog.delete({
            where: { id }
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
    remove,
    getByPage
}