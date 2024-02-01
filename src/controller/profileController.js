import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import fileService from '../service/fileService.js';
import { isProfile } from '../validation/profileValidation.js';
import educationController from './educationController.js';
import experienceController from './experienceController.js';
import projectController from './projectController.js';
import skillController from './skillController.js';
import blogController from './blogController.js';
import dayjs from 'dayjs';

// PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
        const data = await getProfile();

        // jika ada isinya => kirim data asli
        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA PROFILE
const put = async (req, res, next) => {
    try {
        // GET DATA PROFILE DARI DB, FIND FIRST
        const profile = await Prisma.profile.findFirst();

        // collect data & validate
        let data = req.body;

        // add avatar
        if (req.file) {
            const avatar = '/' + req.file.path.replaceAll("\\", "/")
            data.avatar = avatar;
        }

        // validasi
        data = Validate(isProfile, data)

        let dataProfile = {};
        if (profile == null) {
            // JIKA NULL, MAKA BUAT DATA BARU - CREATE
            dataProfile = await Prisma.profile.create({
                data: data
            });

        } else {
            // JIKA ADA ISINYA, UPDATE DATA TERSEBUT - UPDATE
            dataProfile = await Prisma.profile.update({
                where: {
                    email: profile.email
                },
                data
            });

            // hapus poto lama
            const avatar_lama = profile.avatar;
            const avatar_baru = dataProfile.avatar;
            if (avatar_lama) {
                if (avatar_lama == !avatar_baru) {
                    await fileService.removeFile(avatar_lama);
                }
            }
        }

        res.status(200).json({
            messege: "Berhasil ubah data profile seluruhnya berdasarkan id",
            data: dataProfile
        });

    } catch (error) {
        // jika error && ada file. maka file dihapus
        console.log("andle error")

        if (req.file) {
            // handle buang file
            await fileService.rm(req.file.path)

        }
        next(error);
    }

}

const portfolio = async (req, res, next) => {
    try {
        // profile
        const profile = await getProfile();

        // project
        const { data: projects } = await projectController.getByPage(1, 4);
        //menghasilkan variable project

        //experience
        const experience = await experienceController.getExperiences();

        // education
        const education = await educationController.getEducations();

        //skill by category
        const skills = await skillController.handleSkillByCategory();

        // blog
        const { data: blogs } = await blogController.getByPage(1, 4);

        // calculate projects
        profile.count_project = projects.length;

        // hitung tahun pengalaman / experience
        // kalkulasi project pertama -> startDate dengan tanggal sekarang, check perbandingannya berapa tahun

        // ambil project aray terakhir
        const firstProject = projects.findLast(p => true);
        const firstProjectDate = dayjs(firstProject.startDate);

        profile.year_of_experience = dayjs().diff(firstProjectDate, "year");
        profile.month_of_experience = dayjs().diff(firstProjectDate, "month");


        res.status(200).json({
            profile,
            projects,
            experience,
            education,
            skills,
            blogs
        });
    } catch (error) {
        next(error);
    }
}


const getProfile = async () => {

    let profile = await Prisma.profile.findFirst();

    // jika kosong => kirim data dummy
    if (!profile) {
        // buat data dummy disini
        profile = {
            email: "example@gamil.com",
            firstname: "-",
            lastname: "-",
            dob: "1900-10-10",
            addres: "-",
            job: "-",
            city: "-",
            country: "-"
        };
    }

    return profile;
}

export default {
    get,
    put,
    portfolio
}