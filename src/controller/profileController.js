import { Prisma } from '../application/prisma.js';


// PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
        // CEK KE DATABASE
        let profile = await Prisma.profile.findFirst();

        console.log("profile ===============");
        console.log(profile);

        // jika kosong => kirim data dummy
        if (!profile) {
            // buat data dummy disini
            profile = {
                email: "example@gamil.com",
                firstName: "-",
                lastName: "-",
                dob: "1900-10-10",
                addres: "-"
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
const put = (req, res) => {
    res.status(200).json({
        messege: "Berhasil ubah data profile seluruhnya berdasarkan id"
    });
}

export default {
    get,
    put
}