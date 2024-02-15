// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import { Prisma } from '../application/prisma.js';
import cookieParser from 'cookie-parser';


const createToken = (res, email, age = process.env.SESSION_AGE) => {
    // return token
    const jwtSecret = process.env.JWT_SECRET;

    var token = jwt.sign({ email: email },
        jwtSecret,
        { expiresIn: age }
    );

    // SEND TOKEN TO COOKIE
    const maxAge = 24 * 60 * 60 * 1000;
    let cookieConfig = {
        maxAge: maxAge
    }
    res.cookie("token", token, cookieConfig);

    return token;

}

const updateUserToken = async (email, token) => {
    // lakukan prisma update
    // return data user

    const user = await Prisma.user.update({
        where: { email },
        data: { token },
        select: {
            name: true,
            email: true
        }
    })

    return user;
}

export default {
    createToken,
    updateUserToken
}