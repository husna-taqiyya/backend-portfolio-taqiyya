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

export default {
    find_or_create_skill_category
}
