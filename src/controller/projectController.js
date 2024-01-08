import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isID } from "../validation/mainValidation.js";
import { isProject } from "../validation/projectValidation.js";

// PATH : METHOD UNTUK MENYIMPAN DATA project
const getAll = async (req, res, next) => {
    try {
        const projects = await Prisma.project.findMany();

        res.status(200).json({
            messege: "berhasil mendapat data project",
            data: projects
        });
    } catch (error) {
        next(error);
    }
}

// PROJECT BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = Validate(isID, id);

        const project = await Prisma.project.findUnique({
            where: {
                id: id
            }
        });

        if (project == null) throw new ResponseError(404, `project dengan ${id} tidak ditemukan`);

        res.status(200).json({
            messege: "berhasil mendapat data project berdasarkan id = " + id,
            data: project
        });
    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const post = async (req, res, next) => {
    try {
        let project = req.body;

        //validate
        project = Validate(isProject, project)

        // project
        const newProject = await Prisma.project.create({
            data: project
        })

        res.status(200).json({
            messege: "berhasil menyimpan data project sebagian berdasarkan id",
            data: newProject
        });

    } catch (error) {
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
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentProject) throw new ResponseError(404, `project dengan ${id} tidak ditemukan`);

        const updateData = await Prisma.project.update({
            where: {
                id: id
            },
            data: project
        });


        res.status(200).json({
            messege: "Berhasil ubah data project seluruhnya berdasarkan id",
            data: updateData
        });
    } catch (error) {
        next();
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        // END VALIDATE ID

        const currentProject = await Prisma.project.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentProject) throw new ResponseError(404, `project dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.project.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            messege: "Berhasil menghapus data project"
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