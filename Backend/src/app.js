const express = require('express');
require('dotenv').config();
require('./config/database')();
// const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const ConnectDB = require('./config/database');
const User = require('./models/user');
const ConnectionRequest = require('./models/connectionRequest');
const validator = require('validator');
const auth = require('./middlewares/auth');

const { ValidatSignUpData } = require('./utils/validation');
app.use(express.json());
app.use(cookieParser());

const AuthRouter = require('./Routes/auth');
const ProfileRouter = require('./Routes/profile');
const ConnectionRouter = require('./Routes/connection');

app.use('/', AuthRouter);
app.use('/', ProfileRouter);
app.use('/', ConnectionRouter);

 ConnectDB()
 .then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
 })
 .catch((error)=>{
    console.error("Database connection failed:", error);
 });

 