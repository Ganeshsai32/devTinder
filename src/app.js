const express = require("express");
const connectDB = require("./config/database");
const app= express();
const User = require("./models/user");
const {validateSignUpData} = require ("./utils/validation");
const bcrypt = require ("bcrypt");
const cookieParser= require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

const cors= require('cors');
app.use(cors());


app.post("/signup", async (req,res)=>{

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

app.post("/login", async (req,res)=>{

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
 

app.get("/profile",userAuth,async (req,res)=>{

    try {

    const user= req.user;
    res.send(user);

}catch(err) {
    res.status(400).send("something went wrong");

}

});



app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user= req.user;
    console.log("sending a connection request");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    res.send(user.firstName+ "sent the connection request");
});



connectDB()
.then(() => {
    console.log("databse connection established");
    app.listen(3000,() => {
        console.log("server is   on port777");
    
    });
   
})


.catch((err) => {
       console.error("database cannot be established");
});







