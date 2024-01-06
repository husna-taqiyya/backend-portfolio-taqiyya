import { Prisma } from '..application/prisma.js';


// PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
        // CEK KE DATABASE
        let profile = await Prisma.profile.findfirst();

        // jika kosong => kirim data dummy
        if (!profile) {
            // buat data dummy disini
            profile = "data dummy"
        }

        // jika ada isinya => kirim data asli
        res.status(200).json({
            message: "berhasil ambil data profile"
        });

    } catch (error) {
        next(error);
    }




    // ambil data dari database;
    // const data = {
    //     firstname: "john",
    //     lastname: "doe",
    //     email: "johndoe@gmail.com",
    //     age: 18
    // };

    res.status(200).json({
        messege: "berhasil ambil data profile",
        data: data
    });
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