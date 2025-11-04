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

const ValidateEditProfileData=(req)=>{
    if (!req.body || typeof req.body !== 'object') {
        throw new Error("Invalid request body");
    }
    const ALLOWED_UPDATES = ['Firstname', 'Lastname', 'age', 'gender', 'skills', 'bio', 'photourls'];
    const updates = Object.keys(req.body).every((update) => ALLOWED_UPDATES.includes(update));
    if(!updates){
        throw new Error("Invalid updates!");
    }

    const { Firstname, Lastname, age, gender, skills, bio, photourls } = req.body;

    if(Firstname && (typeof Firstname !== 'string' || Firstname.length <2 || Firstname.length >30)){
        throw new Error("Firstname must be a string between 2 and 30 characters.");
    }
    if(Lastname && (typeof Lastname !== 'string' || Lastname.length <2 || Lastname.length >30)){
        throw new Error("Lastname must be a string between 2 and 30 characters.");
    }
    if(age && (isNaN(age) || age <18 || age >50)){
        throw new Error("Age must be a number between 18 and 50.");
    }
    if(gender && !['Male', 'Female', 'Other'].includes(gender)){
        throw new Error("Gender must be Male, Female, or Other.");
    }
    if(skills && (!Array.isArray(skills) || skills.length > 10 || !skills.every(skill => typeof skill === 'string' && skill.length <= 50))){
        throw new Error("Skills must be an array of strings, max 10 skills, each skill max 50 characters.");
    }
    if(bio && (typeof bio !== 'string' || bio.length > 250)){
        throw new Error("Bio must be a string with max 250 characters.");
    }
    if(photourls && (!Array.isArray(photourls) || photourls.length > 5 || !photourls.every(url => typeof url === 'string' && validator.isURL(url)))){
        throw new Error("Photo URLs must be an array of valid URLs, max 5 URLs.");
    }

    return updates;
}


module.exports={ValidatSignUpData, ValidateEditProfileData };










