import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';
import dayjs from 'dayjs';
import fileService from '../service/fileService.js';

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

        // SEARCH
        const search = req.query.search || '';

        console.log('search =========================');
        console.log(search);

        // get total data
        const { data, total } = await getByPage(page, limit, search);
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            data,
            total,
            page,
            limit,
            maxPage
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getByPage = async (page = 1, limit = 10, search = '') => {
    // SKIP
    const skip = (page - 1) * limit;

    const data = await Prisma.blog.findMany({
        where: {
            title: {
                contains: search
            }
        },
        take: limit,
        skip: skip,
        include: { photos: true },
        orderBy: { createdAt: 'desc' } // ambil yang tebaru
    });

    // format data to get readable date time
    // loop data
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
            where: { id },
            include: { photos: true }
        });

        // HANDLE NOT FOUND
        if (data == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        formatData(data);

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA BLOG
const post = async (req, res, next) => {
    try {
        // untuk mengumpulkan photo path
        const photos = fileService.getUploadedPhotos(req);

        let blog = req.body;

        // BLOG VALIDATE
        blog = Validate(isBlog, blog)

        // create blog beserta photos
        const data = await Prisma.blog.create({
            data: {
                ...blog,
                photos: {
                    create: photos
                }
            },
            include: { photos: true }
        });

        formatData(data);

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        if (req.files) {
            for (const file of req.files) {
                await fileService.removeFile(file.path);
            }
        }
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
            include: {
                photos: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // kumpulkan id photo
        const currentPhotos = currentBlog.photos.map(photo => photo.id);
        const idYangDiPertahankan = blog.photos || [];

        // filter foto yang di pertahankan
        // current photos di filter berdasarkan id yang dipertahankan
        const keepsPhotos = currentPhotos.filter(idPhoto => idYangDiPertahankan.includes(idPhoto));
        const photo_to_be_remove = currentBlog.photos.filter(Photo => !idYangDiPertahankan.includes(Photo));

        // hapus variable photo
        delete blog.photos;

        // simpan foto baru
        const newPhotos = fileService.getUploadedPhotos(req);

        // update blog + delete foto yg tdk di pertahankan
        const data = await Prisma.blog.update({
            where: { id },
            data: {
                ...blog,
                photos: {
                    deleteMany: {
                        id: {
                            notIn: keepsPhotos // delete yang tidak di pertahankan
                        }
                    },
                    create: newPhotos // add new photo
                }
            },
            include: {
                photos: true
            }
        });

        // remove unuse photo
        for (const photo of photo_to_be_remove) {
            await fileService.removeFile(photo.path)
        }

        formatData(data);

        res.status(200).json(data);
    } catch (error) {
        if (req.files) {
            // buang file jika error
            for (const file of req.files) {
                await fileService.removeFile(file.path);
            }
        }
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

        // EKSEKUSI PATCH
        const updateTitle = await Prisma.blog.update({
            where: { id },
            data: { title },
            include: {
                photos: true
            }
        });

        formatData(updateTitle);

        res.status(200).json(updateTitle);

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
            select: { id: true },
            include: {
                photos: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.blog.delete({
            where: { id }
        });

        // hapus data
        for (const photo of currentBlog.photos) {
            await fileService.removeFile(photo.path)
        }

        res.status(200).json({
            messege: "Success"
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export default {
    getAll,
    get,
    getByPage,
    post,
    updateTitle,
    put,
    remove
}