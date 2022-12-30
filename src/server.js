const express = require("express");
const pool = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;

// init server
const app = express();

// db connection
pool.connect()
    .then(() => {
        app.listen(PORT, () => console.log("connected", PORT));
    })
    .catch((err) => {
        console.error(err.stack);
    });

// middlewares
app.use(express.urlencoded({ extended: false }));

// body parser
app.use(express.json());

// routes
app.use(authRoutes);
