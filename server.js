const express = require("express");
const fsPromises = require("fs").promises;
const path = require("path");
const pool = require("./dbConfig");

const PORT = process.env.PORT || 5000;
// init server
const app = express();

// middlewares & body parser

// db connection
pool.connect()
    .then(() => {
        app.listen(PORT, () => console.log("connected"));

        pool.query(``, (err, res) => {
            if (err) {
                console.error(err.stack);
            } else {
                console.log("query success");
            }
        });
    })
    .catch((err) => console.error(err.stack));
