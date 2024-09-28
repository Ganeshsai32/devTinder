const express = require("express");
const connectDB = require("./config/database");
const app= express();
const User = require("./models/user");
app.use(express.json());

const cors= require('cors');
app.use(cors());


app.post("/signup", async (req,res)=>{

    const user= new User (req.body);

    try {
        await user.save();
        res.send("user data sucessfully");
    }
    catch(err){
        res.status(400).send("Error saving the user :" + err.message);
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







