import Joi from "joi";
import { isString100, isText, isURI } from "./mainValidation.js";

const isProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100.required(),
    lastname: isString100.required(),
    dob: Joi.date().less('now'),
    addres: isText,
    bio: isText,
    city: isString100,
    country: isString100,
    job: isString100,
    phone: isString100,
    website: isURI,
    github: isURI,
    gitlab: isURI,
    instagram: isURI,
    facebook: isURI,
    twitter: isURI,
    linkedin: isURI,
    discord: isURI
})

export {
    isProfile
}