const express = require("express");

// inti server
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db connection

// routes
