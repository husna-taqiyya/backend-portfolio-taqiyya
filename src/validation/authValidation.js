import Joi from 'joi';

const loginValidation = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(100).required().label("Password")
});

const updateUserValidation = Joi.object({
    name: Joi.string().label("Name"),
    email: Joi.string().email().label("Email"),
    current_password: Joi.string().min(6).max(100).label("Password"),
    password: Joi.string().min(6).max(100).label("Password"),
    confirm_password: Joi.string().min(6).max(100)
        .valid(Joi.ref('password'))
        .label("Password Confirm")
        .options({
            messages: {
                'any.only': '{(#label)} not match'
            }
        })
});

const createUserValidation = Joi.object({
    name: Joi.string().label("Name"),
    email: Joi.string().email().label("Email"),
    password: Joi.string().min(6).max(100).label("Password"),
    confirm_password: Joi.string().min(6).max(100)
        .valid(Joi.ref('password'))
        .label("Password Confirm")
        .options({
            messages: {
                'any.only': '{(#label)} not match'
            }
        })
});

export {
    loginValidation,
    updateUserValidation,
    createUserValidation
}