import Joi from "joi";
import { isString100, isText, isURI } from "./mainValidation.js";

const nonRequired = {
    avatar: Joi.string().max(255).optional(),
    bio: isText,
    website: isURI,
    github: isURI,
    gitlab: isURI,
    instagram: isURI,
    facebook: isURI,
    twitter: isURI,
    linkedin: isURI,
    discord: isURI,
    job: isString100,
    phone: isString100
};

const isCreateProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100.required(),
    lastname: isString100.required(),
    dob: Joi.date().less('now').required(),
    city: isString100.required(),
    country: isString100.required(),
    addres: isText.required(),
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
    ...nonRequired
});


export {
    isCreateProfile,
    isUpdateProfile,
}