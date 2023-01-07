const joi = require("joi");

const authSchema = joi.object({
    first_name: joi.string().min(2).max(30).required(),
    last_name: joi.string().min(2).max(30).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

module.exports = authSchema;
