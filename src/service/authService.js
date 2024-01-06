// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import { Prisma } from '../application/prisma.js';


const createToken = (res, email, age) => {
    // return token
    const jwtSecret = process.env.JWT_SECRET;
    const maxAge = age ? age : process.env.SESSION_AGE;

    var token = jwt.sign({ email: email }, jwtSecret, {
        expiresIn: maxAge
    });

    // SEND TOKEN TO COOKIE
    res.cookie("token", token);

    return token;

}

const updateUserToken = async (email, token) => {
    // lakukan prisma update
    // return data user

    const user = await Prisma.user.update({
        where: {
            email: email
        },
        data: {
            token: token
        },
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