const express = require('express');
const pool = require('./config/dbConfig');
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const searchTopics = require('./routes/api/search');
const cookieParser = require('cookie-parser');

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
app.use(authRoutes);
app.use(searchTopics);
