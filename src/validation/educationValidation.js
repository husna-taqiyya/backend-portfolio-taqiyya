import Joi from 'joi';
import { isString100, isYear } from './mainValidation.js';

const isEducation = Joi.object({
    institutionName: isString100.required().label("institutionName"),
    startYear: isYear.required().label("Start Year"),
    endYear: isYear,
    major: isString100,
    degree: isString100
});

export {
    isEducation
}