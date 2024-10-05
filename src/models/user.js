const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new  mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        minLength:4,
        maxLength:50,
    },

    lastName:{
        type:String,
    },

    emailId: {
        type: String,
        lowercase:true,
       required:true,
       unique:true,
        trim:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address" + value);
        }
        
        }
        
    },

    passWord:{
        type: String,
        required:true,
    },

    age : {
        type : Number,
    },

    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
   

});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",{
        expiresIn:"7d",
    });

    return token;
};


userSchema.methods.validatePassword = async function(passwordInputByUser){
const user = this;
const passwordHash = user.passWord;

const isPasswordvalid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
);

return isPasswordvalid;
};


module.exports  = mongoose.model("User",userSchema);
