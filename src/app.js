const express = require("express");
const connectDB = require("./config/database");
const app= express();
const User = require("./models/user");
const cors= require('cors');
app.use(cors());



app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName: "Ganesh",
        lastName: "sai",
        emailId: "ganeshsai.com",
        passWord:"ganesh@123",
    });

    await user.save();
    res.send("use added sucessfully");
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







