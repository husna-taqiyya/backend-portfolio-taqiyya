import { Prisma } from '../application/prisma.js';
import { Validate } from "../application/validate.js";
import { isID } from "../validation/mainValidation.js";
import { isExperience } from "../validation/experienceValidation.js";
import { ResponseError } from '../error/responseError.js';

// PATH : METHOD UNTUK MENYIMPAN DATA project
const getAll = async (req, res, next) => {
    try {
        const experiences = await Prisma.experience.findMany();

        res.status(200).json({
            messege: "berhasil mendapat data experience",
            data: experiences
        });
    } catch (error) {
        next(error);
    }
}

const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const experience = await Prisma.experience.findUnique({
            where: { id }
        });

        // HANDLE NOT FOUND
        if (experience == null) throw new ResponseError(404, `experience dengan ${id} tidak ditemukan`);

        res.status(200).json({
            messege: "berhasil mendapat data experience berdasarkan id = " + id,
            data: experience
        });

    } catch (error) {
        next(error);
    }

}

// PATH : METHOD UNTUK MENYIMPAN DATA education
const post = async (req, res, next) => {
    try {
        let experience = req.body;


        experience = Validate(isExperience, experience)

        const newExperience = await Prisma.experience.create({
            data: experience
        })

        res.status(200).json({
            messege: "berhasil mengubah data education sebagian berdasarkan id",
            data: newExperience
        });

    } catch (error) {
        next(error);
    }
}


// PATH : METHOD UNTUK MENYIMPAN DATA education
const put = async (req, res, next) => {
    try {
        let experience = req.body;
        let id = req.params.id;

        id = Validate(isID, id);

        experience = Validate(isExperience, experience);

        const currentExperience = await Prisma.experience.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentExperience) throw new ResponseError(404, `experience dengan ${id} tidak ditemukan`);

        const updateData = await Prisma.experience.update({
            where: { id },
            data: experience
        });

        res.status(200).json({
            messege: "Berhasil ubah data experience seluruhnya",
            data: updateData
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

        const currentExperience = await Prisma.experience.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentExperience) throw new ResponseError(404, `Experience dengan id ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.experience.delete({
            where: { id }
        });

        res.status(200).json({
            messege: "berhasil menghapus data experience"
        });

    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    get,
    post,
    put,
    remove
}