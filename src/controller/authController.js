// LOAD ENV 
import dotenv from 'dotenv'
dotenv.config();

import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bcrypt from 'bcrypt';
import authService from '../service/authService.js';


// PATH: METHOD POST UNTUK LOGIN
const login = async (req, res, next) => {
    try {
        // ambil data body -> email & password
        let loginData = req.body;
        loginData = Validate(loginValidation, loginData);

        // check apakah user & email valid
        const user = await Prisma.user.findUnique({
            where: {
                email: loginData.email
            }
        });

        if (!user) throw new ResponseError(400, "Email or Password is invalid");

        // check password betul atau salah
        const clientPassword = loginData.password;
        const dbPassword = user.password;
        const checkPassword = await bcrypt.compare(clientPassword, dbPassword);

        if (!checkPassword) throw new ResponseError(400, "Email or Password is invalid");

        const email = user.email
        console.log("hasil cek password")
        console.log(checkPassword)
        const token = authService.createToken(res, email);

        const data = await authService.updateUserToken(email, token);

        res.status(200).json({
            messege: "Anda berhasil login",
            data: data,
            token: token
        });

    } catch (error) {
        next(error);
    }

}


const logout = async (req, res, next) => {
    try {
        // UPDATE DATA USER
        const user = req.user;
        const email = user.email;
        await Prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                token: null
            },
            select: {
                email: true
            }
        });


        // BUAT TOKEN UMUR 1 DETIK
        authService.createToken(res, email, '1s');

        // RESET COOKIE
        res.clearCookie('token');

        // SEND DATA SUCCES
        res.status(200).json({
            message: "Success"
        });

    } catch (error) {
        next(error);
    }
}

export default {
    login,
    logout
}