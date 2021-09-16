const express = require("express");
require("dotenv").config();
const router = require("./router");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

module.exports = app;
