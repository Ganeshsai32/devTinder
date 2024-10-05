const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require ("bcrypt");


const {validateSignUpData} = require ("../utils/validation");



authRouter.post("/signup", async (req,res)=>{

    try {
    validateSignUpData(req);

const {firstName,lastName,emailId,passWord}= req.body;

    const passwordHash = await bcrypt.hash(passWord,10);
    console.log(passwordHash);


    const user = new User ( {
        firstName,
        lastName,
        emailId,
        passWord:passwordHash,
        
    });


    
        await user.save();
        res.send("user data sucessfully");
    }
    catch(err){
        res.status(600).send("Error :" + err.message);
    }

});



authRouter.post("/login", async (req,res)=>{

    try{

        const {emailId,passWord} =  req.body;
        const user =await  User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(passWord);

        if (isPasswordValid){

            const token = await user.getJWT();
            

            res.cookie("token",token,{
                expires: new Date(Date.now() + 8 * 3600000),
            });

            res.send("login sucessfully");
        }else {
            throw new Error("Invalid credentials");
        }

    } 
    catch(err) {
        res.status(400).send("ERROR: "+err.message);
    
    }

});
 

authRouter.post("/logout", async (req,res) => {

    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
res.send("logout sucessfully");


});



module.exports = authRouter;