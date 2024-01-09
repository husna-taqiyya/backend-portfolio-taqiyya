// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import { Prisma } from '../application/prisma.js';
import authService from '../service/authService.js';

export const authMiddleware = async (req, res, next) => {
    console.log("enter route blog middleware ===========")
    try {
        // check cookie token;
        const token = req.cookies.token;
        // jika token tidak ada, maka return 401
        if (!token) throw new Error();

        // check siapa pemilik token
        const user = await Prisma.user.findFirst({
            where: { token },
            select: {
                name: true,
                email: true,
                token: true
            }
        });

        console.log("user")

        if (!user) {
            // clear cookie agar tdk dipaki lagi
            res.clearCookie('token');

            // jika token tidak ada, maka return 401
            if (!user) throw new Error();
        }
        // ini kalau user ada
        // check token apakah masih verify menggunakan jwt
        const jwtSecret = process.env.JWT_SECRET;
        jwt.verify(token, jwtSecret);

        // PERBARUI TOKEN
        const email = user.email
        const newToken = authService.createToken(res, email);

        // MASUKKAN DATA USER KE REQUSET

        const dataUser = await authService.updateUserToken(email, newToken);

        req.user = dataUser;
        // kalo OK next
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, you must login first"
        });
    }
};