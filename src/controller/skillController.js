import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { isSkill } from "../validation/skillValidation.js";

// PATH : METHOD 
const getAll = async (req, res) => {
    const data = await Prisma.skill.findMany()


    res.status(200).json({
        messege: "berhasil ambil data skill",
        data: data
    });
}

// 
const get = async (req, res) => {
    const data = await Prisma.skill.findMany()


    res.status(200).json({
        messege: "berhasil ambil data skill",
        data: data
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const post = async (req, res, next) => {
    try {
        let data = req.body;

        data = Validate(isSkill, data);

        // AMBIL ID CATEGORY -> FIND OR CREATE
        const id_category = await find_or_create_skill_category(data.category);

        // CREATE SKILL
        // buat data skill yang akan disimpan
        const insert_data = {
            title: data.title,
            skillCategoryId: id_category
        }

        const skill_data = await Prisma.skill.create({
            data: insert_data
        });

        res.status(200).json({
            message: "Berhasil menyimpan data skill",
            data: skill_data
        });

    } catch (error) {
        next(error);
    }
}

const find_or_create_skill_category = async (title) => {
    // JIKA TIDAK ADA, MAKA BUAT CATEGORY
    // JIKA ADA, MAKA LANGSUNG RETURN ID

    // find category
    const category = await Prisma.skillCategory.findFirst({
        where: {
            title: title
        }
    });

    // jika ada langsung return id
    if (category) return category.id;

    // or create category
    const newCategory = await Prisma.skillCategory.create({
        data: {
            title: title
        }
    });

    // return id yang baru
    return newCategory.id;

}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const patch = (req, res) => {
    res.status(200).json({
        messege: "berhasil mengubah data skill sebagian berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data skill seluruhnya berdasarkan id"
    });
}

// PATH : METHOD UNTUK MENYIMPAN DATA skill
const remove = (req, res) => {
    res.status(200).json({
        messege: "berhasil menghapus data skill"
    });
}

export default {
    get,
    post,
    patch,
    put,
    remove
}