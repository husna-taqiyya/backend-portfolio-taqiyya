import { Prisma } from "../application/prisma.js";

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
    return newCategory.id

}

const remove_category = async (previous_skill_id) => {
    // hapus category yang tidak memiliki relasi
    const category = await Prisma.skillCategory.findUnique({
        where: {
            id: previous_skill_id
        },
        include: {
            _count: {
                select: {
                    Skill: true
                }
            }
        }
    });

    // count skills, kalo 0 , category di hapus
    if (category._count.Skill == 0) {
        // remove
        await Prisma.skillCategory.delete({
            where: {
                id: previous_skill_id
            }
        })
    }
}

export default {
    find_or_create_skill_category,
    remove_category
}
