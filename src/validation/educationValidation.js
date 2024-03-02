import Joi from 'joi';

const maxYear = new Date().getFullYear();
const isEducation = Joi.object({
    institutionName: Joi.string().min(3).max(100).trim().required(),
    startYear: Joi.number().max(maxYear).positive().required(),
    endYear: Joi.number().max(maxYear).positive().required().allow(null),
    major: Joi.string().max(100).trim().allow(''),
    degree: Joi.string().max(100).trim().allow('')
});

export {
    isEducation
}