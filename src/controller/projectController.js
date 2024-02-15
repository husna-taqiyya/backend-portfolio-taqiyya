import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { isID } from "../validation/mainValidation.js";
import { isProject } from "../validation/projectValidation.js";
import { ResponseError } from "../error/responseError.js";
import dayjs from 'dayjs';
import fileService from "../service/fileService.js";

const formatData = (project) => {
    // startDate
    const startDate = project.startDate;
    project.readStartDate = dayjs(startDate).format('DD MMM YYYY');

    if (project.endDate) {
        const endDate = project.endDate;
        project.readEndDate = dayjs(endDate).format('DD MMM YYYY');
    } else {
        project.readEndDate = 'Present'
    }

    // buang pengubung relasi, krn many to many
    const skills = project.skills.map(projectSkill => {
        return projectSkill.Skill
    });
    project.skills = skills;
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const getAll = async (req, res, next) => {
    try {
        // PAGE
        const page = parseInt(req.query.page) || 1;

        // LIMIT
        const limit = parseInt(req.query.limit) || 10;

        const { data, total } = await getByPage(page, limit);

        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
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
    // CALCULAT SKIP
    const skip = (page - 1) * limit;

    const data = await Prisma.project.findMany({
        take: limit,
        skip: skip,
        include: {
            photos: true,
            skills: {
                include: {
                    Skill: true
                }
            }
        },
        orderBy: { startDate: 'desc' }
    });

    // format data to get readable date time
    for (const project of data) {
        formatData(project)
    }

    //get total data
    const total = await Prisma.project.count();

    return {
        data,
        total
    }
}

// PROJECT BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const data = await Prisma.project.findUnique({
            where: { id },
            include: {
                photos: true,
                skills: {
                    include: { Skill: true }
                }
            }
        });

        if (data == null) throw new ResponseError(404, `project dengan ${id} tidak ditemukan`);

        formatData(data);

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const post = async (req, res, next) => {
    try {
        // untuk mengumpulkan photo path
        const photos = fileService.getUploadedPhotos(req);

        let project = req.body;


        //validate
        project = Validate(isProject, project)

        // [{skillId: 5}, {skillId: 6}]
        const skills = project.skills.map(s => {
            return {
                skillId: s
            }
        });

        delete project.skills

        const data = await Prisma.project.create({
            data: {
                ...project,
                photos: {
                    create: photos
                },
                skills: {
                    createMany: {
                        data: skills
                    }
                }
            },
            include: {
                photos: true,
                skills: {
                    include: {
                        Skill: true
                    }
                }
            }
        });

        formatData(data);

        res.status(200).json({
            messege: "berhasil menyimpan data project sebagian berdasarkan id",
            data
        });

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

// PATH : METHOD UNTUK MENYIMPAN DATA project
const put = async (req, res, next) => {
    try {
        let project = req.body;
        let id = req.params.id;

        id = Validate(isID, id);

        // BLOG VALIDATE
        project = Validate(isProject, project);

        const currentProject = await Prisma.project.findUnique({
            where: { id },
            include: {
                photos: true,
                skills: true
            }

        });

        if (!currentProject) throw new ResponseError(404, `project dengan ${id} tidak ditemukan`);

        // kumpulkan id photo
        const currentPhotos = currentProject.photos.map(photo => photo.id);
        const idYangDiPertahankan = project.photos || [];

        // filter foto yang di pertahankan
        // current photos di filter berdasarkan id yang dipertahankan
        const keepsPhotos = currentPhotos.filter(idPhoto => idYangDiPertahankan.includes(idPhoto));
        const photo_to_be_remove = currentProject.photos.filter(photo => !idYangDiPertahankan.includes(photo));

        // hapus variable photo
        delete project.photos;

        // simpan foto baru
        const newPhotos = fileService.getUploadedPhotos(req);

        let skills = [];
        if (project.skills) {
            skills = project.skills.map(s => {
                return {
                    skillId: s
                }
            })
        }

        // delete skill from data update
        delete project.skills;

        const data = await Prisma.project.update({
            where: { id },
            data: {
                ...project,
                photos: {
                    deleteMany: {
                        id: {
                            notIn: keepsPhotos // delete yang tdk diperlukan
                        }
                    },
                    create: newPhotos // add new photo
                },
                skills: {
                    deleteMany: {}, // clear data relasi
                    createMany: {
                        data: skills // simpan ualng, data hasil mapping
                    }
                }
            },
            include: {
                photos: true,
                skills: {
                    include: { Skill: true }
                }
            }
        });

        // remove unuse photo
        for (const photo of photo_to_be_remove.photos) {
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

// PATH : METHOD UNTUK MENYIMPAN DATA project
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        // END VALIDATE ID

        const currentProject = await Prisma.project.findUnique({
            where: { id },
            include: {
                photos: true
            }
        });

        if (!currentProject) throw new ResponseError(404, `project dengan ${id} tidak ditemukan`);
        console.log(currentProject)

        // throw new Error('test')
        // EKSEKUSI DELETE
        await Prisma.project.delete({
            where: { id }
        });

        // remove unuse photo
        for (const photo of currentProject.photos) {
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
    post,
    put,
    remove,
    getByPage
}