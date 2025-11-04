const express = require('express');
const AuthRouter = express.Router();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ValidatSignUpData } = require('../utils/validation');
const validator = require('validator');
const validatePassword = require('../utils/validation').validatePassword;
AuthRouter.post('/signup', async (req, res) => {
try{
    ValidatSignUpData(req);
    const { Firstname, Lastname, Email, password } = req.body;
    const hashpassword = await bycrypt.hash(password, 10);
    const user = new User({
        Firstname,
        Lastname,
        Email,
        password: hashpassword
    });
    await user.save();
    console.log("User signed up successfully");
    res.send({ message: "User signed up successfully", user });
}catch(error){
    if (error.name === 'ValidationError') {
        return res.status(400).send({ message: "Validation error", error: error.message });
    }
    res.status(400).send({ message: error.message });
}


})

AuthRouter.post('/login', async (req, res) => {
try{
    const { Email, password } = req.body;
    if (!Email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }
    const user = await User.findOne({ Email: Email.toLowerCase() });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid credentials" });
    }
    // Create JWT token
    const token = user.generateJWT();
    // Set cookie
    res.cookie('token', token, {
        httpOnly: true,
       // 7 days
    });
    console.log("User logged in successfully");
    res.send({ message: "Login successful", user });
}catch(error){
    res.status(500).send({ message: "Server error", error: error.message });
}


})

AuthRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send({ message: "Logout successful" });
});
module.exports = AuthRouter;