const Joi = require("joi");

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.number().required(),
})





module.exports = {signupSchema }