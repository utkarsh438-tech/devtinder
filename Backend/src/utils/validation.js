const mongoose = require('mongoose');
const validator = require('validator');

const ValidatSignUpData=(req)=>{
    const { Firstname, Lastname, Email, password}=req.body;
    if(!Firstname || typeof Firstname !== 'string' || Firstname.length <2 || Firstname.length >30){
        throw new Error("Firstname must be a string between 2 and 30 characters.");
    }else if(Lastname && (typeof Lastname !== 'string' || Lastname.length <2 || Lastname.length >30)){
         throw new Error("Lastname must be a string between 2 and 30 characters.");
    }else if(!Email || validator.isEmail(Email)===false){
       throw new Error("Invalid Email Address");
    }else if(!password || validator.isStrongPassword(password)===false){
        throw new Error("Password is not strong enough");
    }
}
module.exports={ValidatSignUpData };










