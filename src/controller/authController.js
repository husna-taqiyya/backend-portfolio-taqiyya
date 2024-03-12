// LOAD ENV 
import dotenv from 'dotenv'
dotenv.config();

import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js"
import { ResponseError } from "../error/responseError.js";
import { createUserValidation, loginValidation, updateUserValidation } from "../validation/authValidation.js";
import bcrypt from 'bcrypt';
import authService from '../service/authService.js';


// PATH: METHOD POST UNTUK LOGIN
const login = async (req, res, next) => {
    try {
        // ambil data body -> email & password
        let loginData = req.body;
        const { email, password } = Validate(loginValidation, loginData);

        // CHECK EMAIL
        const user = await Prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new ResponseError(400, "Email or Password is invalid");

        // check password betul atau salah
        const dbPassword = user.password;
        const checkPassword = await bcrypt.compare(password, dbPassword);

        if (!checkPassword) throw new ResponseError(400, "Email or Password is invalid");

        const token = authService.createToken(res, email);

        const data = await authService.updateUserToken(email, token);

        res.status(200).json(data);

    } catch (error) {
        next(error);
    }

};


const logout = async (req, res, next) => {
    try {
        // UPDATE DATA USER
        const user = req.user;
        const email = user.email;

        await Prisma.user.update({
            where: { email },
            data: { token: null },
            select: { email: true }
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
};

// GET USER DATA
const get = async (req, res, next) => {
    try {

        const user = await Prisma.user.findFirstOrThrow({
            select: {
                name: true,
                email: true
            }
        });

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

const put = async (req, res, next) => {
    try {
        let data = req.body;

        data = Validate(updateUserValidation, data);
        // name , email, current_password, password, confirm_pasword

        // get current user
        const currentUser = await Prisma.user.findFirstOrThrow();

        // currentUser.password == current_password
        if (data.current_password) {
            const checkPassword = await bcrypt.compare(data.current_password, currentUser.password);
            if (!checkPassword) throw new ResponseError(400, "current password is invalid");

            // remove confirm password
            delete data.current_password;
            delete data.confirm_password;

            // update password to hase
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updateUser = await Prisma.user.update({
            where: { email: currentUser.email },
            data: data,
            select: {
                name: true,
                email: true
            }
        });

        res.status(200).json(updateUser);

    } catch (error) {
        next(error);
    }
};

const createFirstUser = async (req, res, next) => {
    try {
        // cek apakah user sudah ada di database
        const checkUser = await Prisma.user.findFirst();

        if (checkUser != null) {
            res.status(403).json({
                message: 'User already exist'
            });

            next();
        } else {
            // validasi
            const data = Validate(createUserValidation, req.body);

            // buang confirm password
            delete data.confirm_password;

            // enkripsi password
            data.password = await bcrypt.hash(data.password, 10);

            // create user
            const user = await Prisma.user.create({
                data,
                select: {
                    name: true,
                    email: true
                }
            });

            // create user
            res.status(200).json(user);
        }
    } catch (error) {
        next(error)
    }
};

const isUserExist = async (req, res, next) => {
    try {
        // check ke db
        const user = await Prisma.user.findFirst();

        // return true / false
        res.status(200).json({
            isExist: user ? true : false
        });
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default {
    login,
    logout,
    get,
    put,
    createFirstUser,
    isUserExist
}