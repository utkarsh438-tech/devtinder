const express = require('express');
require('dotenv').config();
require('./config/database')();
const bycrypt = require('bcrypt');
const app = express();
const ConnectDB = require('./config/database');
const User = require('./models/user');
const validator = require('validator');
 
const { ValidatSignUpData } = require('./utils/validation');
app.use(express.json());

app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
try{
    const { Email, password } = req.body;
    if (!Email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }
    const user = await User.findOne({ Email: Email.toLowerCase() });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid credentials" });
    }
    console.log("User logged in successfully");
    res.send({ message: "Login successful", user });
}catch(error){
    res.status(500).send({ message: "Server error", error: error.message });
}


})

app.patch('/user', async (req, res) => {
    const { userId, updateData } = req.body;
   
    
    try {
         const ALLOWED_UPDATES = ['Firstname', 'Lastname', 'age', 'gender', 'skills', 'bio', 'photourls'];
    const updates = Object.keys(updateData).every((update) => ALLOWED_UPDATES.includes(update));

    if (!updates) {
        return res.status(400).send({ message: "Invalid updates!" });
    }
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        console.log("User updated successfully");
        res.send({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
})
app.delete('/user/:id',async(req,res)=>{
    const userId=req.params.id;
    try{
        const user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).send({message:"User not found"});
        }}catch(error){
            res.status(500).send({message:"Server error",error:error.message});
        }
        console.log("User deleted successfully");
        res.send({message:"User deleted successfully"});
});


app.post('/users', async (req, res) => {
try {
    const UserData = new User(req.body);

    await UserData.save();
    res.send({message:"User created successfully", user: UserData});
} catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).send({message: "Validation error", error: error.message});
    }
    res.status(500).send({message:"Server error", error: error.message});
}
});
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

 