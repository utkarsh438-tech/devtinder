const express = require('express');
require('dotenv').config();
require('./config/database')();
// const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const ConnectDB = require('./config/database');
const User = require('./models/user');
const ConnectionRequest = require('./models/connectionRequest');
const validator = require('validator');
const auth = require('./middlewares/auth');

const { ValidatSignUpData } = require('./utils/validation');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true,
}));


const AuthRouter = require('./Routes/auth');
const ProfileRouter = require('./Routes/profile');
const ConnectionRouter = require('./Routes/connection');
const UserRouter = require('./Routes/user');

app.use('/', AuthRouter);
app.use('/', ProfileRouter);
app.use('/', ConnectionRouter);
app.use('/', UserRouter);

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

 