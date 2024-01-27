import Joi from 'joi';
import { isString100, isText } from './mainValidation.js';

const isExperience = Joi.object({
    title: isString100.required(),
    company: isString100.required(),
    location: isString100.required(),
    description: isText.required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).max('now').allow(null, "")
});

export {
    isExperience
}