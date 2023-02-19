const joi = require('joi');

// validation
const signupAuthSchema = joi.object({
    first_name: joi.string().min(2).max(30).required(),
    last_name: joi.string().min(2).max(30).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

const signinAuthSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().required(),
});

// validation error handler
const handleErrors = (err) => {
    if (err.message.includes(`"confirmPassword" must be [ref:password]`)) {
        return 'Passwords do not match';
    }

    if (
        err.message.includes(
            'duplicate key value violates unique constraint "pk_user"'
        )
    ) {
        return 'Email is already registered';
    }
    return err.message.replace(/['"]+/g, '');
};

module.exports = { signinAuthSchema, signupAuthSchema, handleErrors };
