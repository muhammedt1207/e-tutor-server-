import Joi from 'joi'

export const signupValidation = Joi.object({
    userName: Joi.string()
    .required()
    .min(3)
    .max(255),
    email: Joi.string()
    .email()
    .required()
    .max(255),
    password: Joi.string()
    .required()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
    .min(6)
    .max(255),
    confirmPassword: Joi.ref('password')
})