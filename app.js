require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());

// Register
app.post("/register", async (req, res) => {

    try{

        // Check input body
        const { phone_no, password } = req.body;

        // Validate user input
        if(!(phone_no && password)){
            res.status(400).send("All input is requried.");
        }

        // Check user exist
        const oldUser = await User.findOne({phone_no});

        if(oldUser){
            return res.status(409).send("User already exist!. Please login.");
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            phone_no,
            user_name: phone_no,
            password: encryptedPassword
        })

        // Create token
        const token = jwt.sign(
            {user_id: user._id,phone_no},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // Save user token
        user.token = token;

        // Return new user
        res.status(201).json(user);

    }catch(err){
        console.log(err);
    }
})

// Login
app.post("/login", async (req, res) => { 
    // Check input body
    const { user_name, password } = req.body;

    // Validate user input
    if(!(user_name && password)){
        res.status(400).send("All input is requried.");
    }

    // Validate user
    const user = await User.findOne({user_name});

    if (user && (await bcrypt.compare(password, user.password))){

        // Create token
        const token = jwt.sign(
            { uer_id: user._id,user_name},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // Save user token
        user.token = token;
        res.status(200).json(user);

    }

    res.status(400).send("Invalid Credentials.!");

})

app.post('/welcome',auth, (req,res) => {
    res.status(200).send("Welcome 🙏 🙏 🙏")
})

module.exports = app;