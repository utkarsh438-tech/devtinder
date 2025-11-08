const express = require('express');
const ProfileRouter = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
 const { ValidateEditProfileData } = require('../utils/validation');

ProfileRouter.patch('/user', async (req, res) => {
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
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
})
ProfileRouter.delete('/user/:id',async(req,res)=>{
    const userId=req.params.id;
    try{
        const user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).send({message:"User not found"});
        }}catch(error){
            res.status(500).send({message:"Server error",error:error.message});
        }
        console.log("User deleted successfully");
        res.json({message:"User deleted successfully"});
});


ProfileRouter.get('/profile/view', auth, async (req, res) => {
    try {
        res.json({ message: "Profile retrieved successfully", data: req.user });
    } catch (error) {
        res.status(401).send({ message: "Server error", error: error.message });
    }
});

ProfileRouter.post('/users', async (req, res) => {
try {
    const UserData = new User(req.body);

    await UserData.save();
    res.json({message:"User created successfully", data: UserData});
} catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).send({message: "Validation error", error: error.message});
    }
    res.status(500).send({message:"Server error", error: error.message});
}
});

ProfileRouter.patch('/profile/edit',auth,async(req,res)=>{
    try{
       if (!req.body || typeof req.body !== 'object') {
           return res.status(400).send({message:"Invalid request body"});
       }
       ValidateEditProfileData(req);
       const user=req.user;
       Object.keys(req.body).forEach((update)=>user[update]=req.body[update]);
       await user.save();
       return res.json({message:"Profile updated successfully", data: user});

    }catch(error){
        return res.status(400).send({message:error.message});
    }

})

ProfileRouter.patch('/profile/password', auth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({ message: "Old password and new password are required" });
        }
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).send({ message: "New password is not strong enough" });
        }
        const user = req.user;
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(401).send({ message: "Old password is incorrect" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
module.exports = ProfileRouter;