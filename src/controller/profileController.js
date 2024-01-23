import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isProfile } from '../validation/profileValidation.js';


// PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
        // CEK KE DATABASE
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
                city: "-"
            };
        }

        // jika ada isinya => kirim data asli
        res.status(200).json({
            message: "berhasil ambil data profile",
            data: profile
        });

    } catch (error) {
        next(error);
    }
}

// PATH : METHOD UNTUK MENYIMPAN DATA PROFILE
const put = async (req, res, next) => {
    console.log(req.file);
    return;
    try {
        // GET DATA PROFILE DARI DB, FIND FIRST
        const profile = await Prisma.profile.findFirst();

        // collect data & validate
        let data = req.body;
        // validasi
        console.log(data)
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
        }

        res.status(200).json({
            messege: "Berhasil ubah data profile seluruhnya berdasarkan id",
            data: dataProfile
        });

    } catch (error) {
        next(error);
    }

}

export default {
    get,
    put
}