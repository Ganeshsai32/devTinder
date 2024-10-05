const express = require("express");
const connectDB = require("./config/database");
const app= express();
const cookieParser= require("cookie-parser");
const {userAuth} = require("./middlewares/auth");



app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter= require("./routes/profile");
const requestRouter= require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

const cors= require('cors');
app.use(cors());

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







