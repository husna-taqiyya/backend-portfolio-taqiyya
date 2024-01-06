import Joi from 'joi';

const isID = Joi.number().positive().required().label("ID");
const isYear = Joi.number().positive()
const isString100 = Joi.string().trim().min(3).max(100);
const isText = Joi.string().min(3).trim();

export {
    isID,
    isYear,
    isString100,
    isText
}