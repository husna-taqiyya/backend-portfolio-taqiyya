import Joi from "joi";
import { isString100, isString255, isText, isURI } from "./mainValidation.js";

const isProject = Joi.object({
    title: isString255.required(),
    description: isText.required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).max('now'),
    status: Joi.string().valid('ON_PROGRESS', 'MAINTENANCE', 'COMPLETE'),
    url: isURI,
    github: isURI,
    company: isString100,
    photos: Joi.array().items(Joi.number()) // kumpulan id [1, 2, 3]
})

export {
    isProject
}