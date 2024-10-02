const express = require("express");
const connectDB = require("./config/database");
const app= express();
const User = require("./models/user");
const {validateSignUpData} = require ("./utils/validation");

app.use(express.json());

const cors= require('cors');
app.use(cors());


app.post("/signup", async (req,res)=>{

    try {
    validateSignUpData(req);

    const user= new User (req.body);

    
        await user.save();
        res.send("user data sucessfully");
    }
    catch(err){
        res.status(600).send("Error :" + err.message);
    }

});
 

app.get("/user",async( req,res) => {

const userEmail = req.body.emailId;

try{
    const user =await User.find({emailId:userEmail});
    res.send(user);
}

catch(err) {
    res.status(400).send("something went wrong");

}
});



app.get("/feed", async (req,res)=>{
    
    try{

        const users=await User.find({});
        res.send(users);


    } catch(err){
        res.status(400).send("something wromg");

    }
});

app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
   try{
      const user=await User.findByIdAndDelete(userId);
      res.send("data added suceesfullly");
   }catch(err){
      res.status(400).send("something went wrong");

   }
});




app.patch("/user/:userId",async (req,res)=>{
    const userId= req.params?.userId;
    const data= req.body; 
    try{
        const ALLOWED_UPDATES = ["userId","gender","age","passWord","firstName","lastName","emailId"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
             );
             if(!isUpdateAllowed){
               throw new Error("update not allowed");
             }
     
    const user =   await User.findByIdAndUpdate({_id:userId},data,{
        returnDocument:"after",
        runValidators:true,
    });
    res.send("user data sucessfully");
     }
     catch(err){
        res.status(400).send("something went wrong");
  
     }


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







