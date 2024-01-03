import { Prisma } from '../application/prisma.js';
import { Validate } from "../application/validate.js";
import { isEducation } from "../validation/educationValidation.js";
import { isID } from "../validation/mainValidation.js";

const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const education = await Prisma.education.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (blog == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        res.status(200).json({
            messege: "berhasil mendapat data education berdasarkan id = " + id,
            data: education
        });

    } catch (error) {
        next(error);
    }

}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const post = async (req, res, next) => {
    try {
        let education = req.body;

        education = Validate(isEducation, education)

        const newEducation = await Prisma.education.create({
            data: education
        })

        res.status(200).json({
            messege: "berhasil mengubah data education sebagian berdasarkan id",
            data: newEducation
        });

    } catch (error) {
        next(error);
    }
}


// PATH : METHOD UNTUK MENYIMPAN DATA education
const put = async (req, res, next) => {
    try {
        let education = req.body;
        let id = req.params.id;

        id = Validate(isID, id);

        education = Validate(isEducation, education);

        const currentEducation = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        const updateData = await Prisma.education.update({
            where: {
                id: id
            },
            data: updateData
        });

        res.status(200).json({
            messege: "Berhasil ubah data education seluruhnya",
            data: updateData
        });
    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const patch = (req, res, next) => {
    try {
        res.status(200).json({
            messege: "berhasil mengubah data education sebagian berdasarkan id"
        });

    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        const currentEducation = await Prisma.education.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Education dengan id ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.education.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            messege: "berhasil menghapus data education"
        });

    } catch (error) {
        next(error);
    }
}

export default {
    get,
    post,
    patch,
    put,
    remove
}