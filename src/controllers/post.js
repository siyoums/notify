const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json('token is invalid');
            req.user = user;
            next();
        });
    } else {
        // redirect to homepage
        // res.redirect('/signin');
        res.send('not signed in buddy');
    }
};

const post = async (req, res, next) => {
    isLoggedIn(req, res, async () => {
        const author_id = req.user.id;
        const author_resp = await pool.query(
            `select full_name from Users where email = '${author_id}'`
        );
        const author = author_resp.rows[0].full_name;

        // TODO: Image and caption can be null but will be set later
        let sql = `insert into Posts (author, author_email, created_at, img, caption) values ('${author}', '${author_id}', now(), ${null}, ${null} )`;
        const resp = await pool.query(sql);
        res.status(400).json({ msg: 'success' });
    });
    // TODO: kinda confused here (will need to be fixed)
    // next();
};

module.exports = { isLoggedIn, post };
