const Joi = require("joi");

/** * Sign In Validations */
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.number().required(),
})


/** * Vendor create Validation */
const VendorCreateSchema = Joi.object({
    business_email: Joi.string().email().required(),
    password: Joi.string().required(),
    user_name: Joi.string().required(),
    business_name: Joi.string().required(),
    business_phone: Joi.number().required(),   
    alternate_phone: Joi.optional(),  
})


/** * Vendor Update Validation */
const VendorUpdateSchema = Joi.object({
    business_email: Joi.string().email().required(),
    user_name: Joi.string().required(),
    business_name: Joi.string().required(),
    business_phone: Joi.number().required(),   
    alternate_phone: Joi.optional(),
})



module.exports = {signupSchema, VendorCreateSchema, VendorUpdateSchema}