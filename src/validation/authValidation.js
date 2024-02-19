import Joi from 'joi';

const loginValidation = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(100).required().label("Password")
});

const updateUserValidation = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    current_password: Joi.string().min(6).max(100).required().label("Password"),
    password: Joi.string().min(6).max(100).required().label("Password"),
    confirm_password: Joi.string().min(6).max(100).required()
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
    updateUserValidation
}