import Joi from "joi";
import { isString100, isText } from "./mainValidation.js";

const isProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100,
    lastname: isString100,
    dob: Joi.date().less('now'),
    addres: isText
})

export {
    isProfile
}