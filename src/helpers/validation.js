const { string } = require("joi");
const joi = require("joi");

const authSchema = joi.object({
    first_name: joi.string().min(2).required(),
    last_name: joi.string().min(2).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
});

module.exports = authSchema;
