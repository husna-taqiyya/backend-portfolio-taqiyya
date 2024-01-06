import { Prisma } from "../application/prisma.js";
import { ResponseError } from "../error/responseError";

// PATH : METHOD UNTUK MENYIMPAN DATA project
const getAll = async (req, res, next) => {
    try {
        const projects = await Prisma.project.findMany();

        res.status(200).json({
            messege: "berhasil mendapat data blog",
            blogs: projects
        });
    } catch (error) {
        next();
    }
}

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
            project
        });
    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const post = (req, res) => {
    try {
        res.status(200).json({
            messege: "berhasil menyimpan data project sebagian berdasarkan id"
        });



    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const patch = (req, res) => {
    try {
        res.status(200).json({
            messege: "berhasil mengubah data project sebagian berdasarkan id"
        });
    } catch (error) {
        next();
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const put = (req, res) => {
    try {
        res.status(200).json({
            messege: "Berhasil ubah data project seluruhnya berdasarkan id"
        });
    } catch (error) {
        next();
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA project
const remove = (req, res) => {
    try {
        res.status(200).json({
            messege: "berhasil menghapus data project"
        });
    } catch (error) {
        next();
    }
}

export default {
    getAll,
    get,
    post,
    patch,
    put,
    remove
}