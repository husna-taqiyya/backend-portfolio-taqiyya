// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import { Prisma } from '../application/prisma.js';

export const authMiddleware = async (req, res, next) => {
    console.log("enter route blog middleware ===========")
    try {
        // check cookie token;
        const token = req.cookies.token;
        console.log("token ============")
        // jika token tidak ada, maka return 401
        if (!token) throw new Error();
        console.log("token2 ============")

        // check siapa pemilik token
        const user = await Prisma.user.findFirst({
            where: {
                token: token
            },
            select: {
                name: true,
                email: true,
                token: true
            }
        });

        console.log("user")

        if (!user) {
            // clear cookie agar tdk dipaki lagi
            res.clearCookie("token");

            // jika token tidak ada, maka return 401
            if (!user) throw new Error();
        }
        // ini kalau user ada
        // check token apakah masih verify menggunakan jwt
        const jwtSecret = process.env.JWT_SECRET;
        jwt.verify(token, jwtSecret);

        // PERBARUI TOKEN
        const maxAge = 60 * 60; // 1 jam
        var newToken = jwt.sign({ email: user.email }, jwtSecret, {
            expiresIn: maxAge
        });

        // MASUKKAN DATA USER KE REQUSET
        req.user = user;

        // PERABARUI TOKEN KE DB USER
        await Prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                token: newToken
            }
        });

        // KIRIM COOKIE 
        res.cookie("token", newToken);

        // if (!verifyToken) {
        //     // clear cookie supaya gak dipake lagi 
        //     res.clearCookie('token');

        //     return res.status(401).json({
        //         message: "Unauthorized, you must login first"
        //     });
        // }

        // kalo OK next
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, you must login first"
        });
    }
};