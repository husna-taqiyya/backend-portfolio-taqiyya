import Joi from 'joi';

const isID = Joi.number().positive().required().label("ID");
const isYear = Joi.number().positive()
const isString100 = Joi.string().trim().min(3).max(100);

export {
    isID,
    isYear,
    isString100
}