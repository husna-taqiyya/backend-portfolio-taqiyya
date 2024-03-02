import { Prisma } from '../application/prisma.js';
import { Validate } from "../application/validate.js";
import { isID } from "../validation/mainValidation.js";
import { isExperience } from "../validation/experienceValidation.js";
import { ResponseError } from '../error/responseError.js';
import dayjs from 'dayjs';

const formatData = (experience) => {
    //nov 2022
    //start date
    const startDate = experience.createdAt;
    experience.readStartDate = dayjs(startDate).format('MMMM YYYY');

    //end Date
    if (experience.endDate) {
        const endDate = experience.endDate;
        experience.shortStartDate = dayjs(endDate).format('MMM YYYY')
    } else {
        experience.readEndDate = 'Present';
    }

}

/// PATH : METHOD UNTUK MENYIMPAN DATA project
const getAll = async (req, res, next) => {
    try {
        const data = await getExperiences();

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const getExperiences = async () => {
    const data = await Prisma.experience.findMany({
        orderBy: { 'startDate': 'desc' }
    });

    // format data to get readable date time
    for (const experiences of data) {
        formatData(experiences)
    }

    return data;
}


const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const experience = await Prisma.experience.findFirst({
            where: { id }
        });

        // HANDLE NOT FOUND
        if (experience == null) throw new ResponseError(404, `experience dengan ${id} tidak ditemukan`);

        formatData(experience);

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
        let data = req.body;

        data = Validate(isExperience, data)

        const newExperience = await Prisma.experience.create({ data });

        formatData(newExperience);

        res.status(200).json({ data: newExperience });

    } catch (error) {
        console.log(error);
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

        formatData(currentExperience);

        const updateData = await Prisma.experience.update({
            where: { id },
            data: experience
        });

        res.status(200).json({
            messege: "Berhasil ubah data experience seluruhnya",
            data: updateData
        });
    } catch (error) {
        console.log(error)
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
    getExperiences,
    get,
    post,
    put,
    remove
}