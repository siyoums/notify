const jwt = require("jsonwebtoken");
const pool = require("../config/dbConfig");
require("dotenv").config();
const hashPassword = require("../helpers/passwordHasher");
const { authSchema } = require("../helpers/validation");
const { handleErrors } = require("../helpers/validation");

// errors

// create jwt token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY);
};

const signupPost = async (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    try {
        const valid = authSchema.validate(req.body);
        if (!valid.error) {
            password = await hashPassword.hash(password);
            const sql = `
            insert into users (first_name, last_name, email, passkey)
            values ('${first_name}', '${last_name}', '${email}', '${password}')`;
            const result = await pool.query(sql);
            const token = createToken(email);
            res.cookie("jwt", token);
            res.status(201).json({ msg: "User registered successfully" });
        } else {
            throw valid.error;
        }
    } catch (err) {
        const error = handleErrors(err);
        // console.log(error);
        res.status(400).json({ errors: { error } });
    }
};

const signinPost = (req, res) => {
    res.send("sign in post");
};

module.exports = { signupPost, signinPost };
