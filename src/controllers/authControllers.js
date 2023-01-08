const jwt = require("jsonwebtoken");
const pool = require("../config/dbConfig");
require("dotenv").config();
const hashPassword = require("../helpers/passwordHasher");
const { signupAuthSchema, signinAuthSchema } = require("../helpers/validation");
const { handleErrors } = require("../helpers/validation");

// create jwt token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY);
};

// sign up
const signupPost = async (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    try {
        const valid = signupAuthSchema.validate(req.body);
        if (!valid.error) {
            password = await hashPassword.hash(password);
            const sql = `
            insert into users (first_name, last_name, email, passkey)
            values ('${first_name}', '${last_name}', '${email}', '${password}')`;
            const result = await pool.query(sql);
            const token = createToken(email);
            res.cookie("token", token, { httpOnly: true });
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

// login
const signinPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = `select *
                    from users
                    where email = '${email}'
        `;
        const valid = signinAuthSchema.validate(req.body);
        if (!valid.error) {
            const resp = await pool.query(
                `select * from users where email = '${email}'`
            );
            if (resp.rowCount === 0) {
                throw Error("Email is not registered");
            }
            const pass = resp.rows[0].passkey;
            const isCorrect = await hashPassword.compare(password, pass);

            if (isCorrect) {
                const token = createToken(email);
                res.cookie("token", token, { httpOnly: true });
                res.status(200).json({ user: resp.rows[0].first_name });
            } else throw Error("Incorrect password");
        }
    } catch (err) {
        const error = handleErrors(err);
        res.status(404).json({ errors: { error } });
    }
};

module.exports = { signupPost, signinPost };
