const jwt = require("jsonwebtoken");
const pool = require("../config/dbConfig");
require("dotenv").config();
const authSchema = require("../helpers/validation");

// errors
const handleErrors = (err) => {
    const errors = { first_name: "", last_name: "", email: "", password: "" };

    console.log(err);

    // if (
    //     err.message.includes(
    //         'duplicate key value violates unique constraint "user_key"'
    //     )
    // ) {
    //     errors.email = "Email is already registered";
    // }

    // return errors;
};

// create jwt token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY);
};

const signupPost = async (req, res) => {
    // const sql = `
    // insert into users (first_name, last_name, email, password)
    // values ('${first_name}', '${last_name}', '${email}', '${password}')
    // `;

    try {
        authSchema.validate(req.body, {});

        // const result = await pool.query(sql);
        // console.log(result);
    } catch (err) {
        // handleErrors(err);
        console.log("an error occured");
    }
};

const signinPost = (req, res) => {
    res.send("sign in post");
};

module.exports = { signupPost, signinPost };
