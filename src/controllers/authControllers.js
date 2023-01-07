const jwt = require("jsonwebtoken");
const { password } = require("pg/lib/defaults");
const pool = require("../config/dbConfig");
require("dotenv").config();
const authSchema = require("../helpers/validation");

// errors
const handleErrors = (err) => {
    if (
        err.message.includes(
            'duplicate key value violates unique constraint "email_unique"'
        )
    ) {
        return "email is already registered";
    }
    return err.message.replace(/['"]+/g, "");
};

// create jwt token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY);
};

const signupPost = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const sql = `
        insert into users (first_name, last_name, email, passkey)
        values ('${first_name}', '${last_name}', '${email}', '${password}')`;

        const valid = authSchema.validate(req.body);
        if (!valid.error) {
            const result = await pool.query(sql);
            res.status(201).json({ msg: "User created successfully" });
        }
        throw valid.error;
    } catch (err) {
        const error = handleErrors(err);
        res.status(500).json({ errors: { error } });
    }
};

const signinPost = (req, res) => {
    res.send("sign in post");
};

module.exports = { signupPost, signinPost };
