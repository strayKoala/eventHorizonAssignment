const joi = require('joi');

const registrationValidation = joi.object({
    firstName: joi.string().required().min(2),
    lastName: joi.string().required().min(2),
    email: joi.string().email().required(),
    password: joi.string().min(8).pattern(/^[a-zA-Z0-9]+$/).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    })
});

const loginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});


module.exports = { registrationValidation, loginValidation };