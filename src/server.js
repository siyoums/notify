const express = require("express");
const pool = require("./config/dbConfig");
const PORT = process.env.PORT || 3500;
const authRoutes = require("./routes/authRoutes");
// inti server
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db connection
pool.connect()
    .then(() => {
        app.listen(PORT, () => console.log("connected", PORT));
    })
    .catch((err) => console.log(err));

// routes
app.use(authRoutes);
