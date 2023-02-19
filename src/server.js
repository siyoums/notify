const express = require('express');
const pool = require('./config/dbConfig');
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
const routes = require('./routes/api/routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// inti server
const app = express();

// middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// db connection
pool.connect()
    .then(() => {
        app.listen(PORT, () => console.log('connected', PORT));
    })
    .catch((err) => console.log(err));

// routes
app.use(routes);
