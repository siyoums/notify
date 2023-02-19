const { isLoggedIn } = require('../controllers/post');
const pool = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkUser = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let resp = await pool.query(
                    `select firt_name from Users where email = '${decodedToken.id}'`
                );
                const user = resp.rows[0].first_name;
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { checkUser };
