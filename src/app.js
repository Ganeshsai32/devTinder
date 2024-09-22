const express = require("express");
const app= express();
const cors= require('cors');

app.use(cors());


app.use("/user",
    (req,res,next)=>{
        console.log("Handling the router 1");
        next();
    res.send("response1");
    
},

(req,res,next) => {
    console.log("hanndling the router2");
    res.send("response2")
    next();
},

(req,res) => {
    res.send("reponse3");
}

);


app.listen(3000,()=>{
    console.log("server is   on port777");

});
