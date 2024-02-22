import Joi from "joi";
import { isString100, isText, isURI } from "./mainValidation.js";

const nonRequired = {
    avatar: Joi.string().max(255).optional(),
    bio: isText.allow(null, ''),
    website: isURI.allow(null, ''),
    github: isURI.allow(null, ''),
    gitlab: isURI.allow(null, ''),
    instagram: isURI.allow(null, ''),
    facebook: isURI.allow(null, ''),
    twitter: isURI.allow(null, ''),
    linkedin: isURI.allow(null, ''),
    discord: isURI.allow(null, ''),
};

const isCreateProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100.required(),
    lastname: isString100.required(),
    dob: Joi.date().less('now').required(),
    city: isString100.required(),
    country: isString100.required(),
    addres: isText.required(),
    phone: isString100.required(),
    job: isString100.required(),
    ...nonRequired
});

const isUpdateProfile = Joi.object({
    email: Joi.string().trim().email().lowercase(),
    firstname: isString100,
    lastname: isString100,
    dob: Joi.date().less('now'),
    city: isString100,
    country: isString100,
    addres: isText,
    phone: isString100,
    job: isString100,
    ...nonRequired
});


export {
    isCreateProfile,
    isUpdateProfile
}