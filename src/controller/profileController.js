import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import fileService from '../service/fileService.js';
import { isCreateProfile, isUpdateProfile } from '../validation/profileValidation.js';
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

        let dataProfile = {};
        if (profile == null) {
            // JIKA NULL, MAKA BUAT DATA BARU - CREATE
            // validasi
            data = Validate(isCreateProfile, data);

            dataProfile = await Prisma.profile.create({ data });


        } else {
            // JIKA ADA ISINYA, UPDATE DATA TERSEBUT - UPDATE
            data = Validate(isUpdateProfile, data);

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

        res.status(200).json({ dataProfile });

    } catch (error) {
        console.log(error);
        // jika error && ada file. maka file dihapus
        console.log("handle error")

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
        if (projects.length) {
            const firstProject = projects.findLast(p => true);
            const firstProjectDate = dayjs(firstProject.startDate);
            profile.year_of_experience = dayjs().diff(firstProjectDate, "year");
            profile.month_of_experience = dayjs().diff(firstProjectDate, "month");
        } else {
            // default
            profile.year_of_experience = 0;
            profile.month_of_experience = 0;

        }

        return res.status(200).json({
            profile,
            skills,
            education,
            experience,
            projects,
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
            email: "example@gmail.com",
            firstname: "-",
            lastname: "-",
            dob: "2000-10-10",
            addres: "-",
            job: "-",
            city: "-",
            country: "-",
            avatar: null,
            bio: null,
            github: null,
            gitlab: null,
            instagram: null,
            facebook: null,
            twitter: null,
            linkedin: null,
            discord: null
        };
    }

    return profile;
}

export default {
    get,
    put,
    portfolio
}