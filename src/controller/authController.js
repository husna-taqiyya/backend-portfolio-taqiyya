// LOAD ENV 
import dotenv from 'dotenv'
dotenv.config();

import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        console.log("hasil cek password")
        console.log(checkPassword)

        if (!checkPassword) throw new ResponseError(400, "Email or Password is invalid");

        const email = user.email
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


const logout = (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        messege: "Semua data di cookie berhasil di hapus"
    });
}

export default {
    login,
    logout
}