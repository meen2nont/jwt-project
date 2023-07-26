require('dotenv').config();
require('./config/database').connect();
require

const express = require('express');
const User = require('./model/user');

const app = express();

app.use(express.json());

// Register
app.post("/register",(req,res) => {

})

// Login
app.post("/login",(req,res) => { 
    

})

module.exports = app;