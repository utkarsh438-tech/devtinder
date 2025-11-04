const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
        minlength:2,
        maxlength:30
    },
    Lastname: {
        type: String},
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(validator.isEmail(value)===false){
                throw new Error("Invalid Email Address");
            }
        }

    },password: {
        type: String,
        required: true,
        minlength:6,
        validate(value){
            if(validator.isStrongPassword(value)===false){
                throw new Error("Password is not strong enough");
            }
        }
    },
    age: {
        type: Number,
        // required: true,
        min:18,
        max:50
    },
        gender: {
            type: String,
            validate(value) {
                const allowedGenders = ['Male', 'Female', 'Other'];
                if (!allowedGenders.includes(value)) {
                    throw new Error('Gender must be Male, Female, or Other');
                }
            }
        },
        skills:{
        type: [String],
        default:["This is a sample skill"]
    },
    bio:{
        type:String,
        maxlength:250,
        default:"This is a sample bio"
        }
    ,photourls:{
        type:[String],
        default:["https://example.com/default-photo.jpg"]
    }},
    {
        timestamps: true
    }
);

userSchema.methods.generateJWT = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

userSchema.methods.validatePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
