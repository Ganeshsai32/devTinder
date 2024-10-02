const mongoose = require("mongoose");
const validator = require("validator");

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
const User = mongoose.model("User",userSchema);
module.exports = User;