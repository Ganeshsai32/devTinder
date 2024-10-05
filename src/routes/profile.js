const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile",userAuth,async (req,res)=>{

    try {

    const user= req.user;
    res.send(user);

}catch(err) {
    res.status(400).send("something went wrong");

}
});


profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{

    try {

       if(! validateEditProfileData(req)){
          
        throw new error ("Invalid edit request");

       }

       const loggedInUser = req.user;
       

       Object.keys(req.body).forEach((key) => (loggedInUser[key]= req.body[key]));
       await loggedInUser.save();
       
      res.send(`${loggedInUser.firstName}, your profile updated succesfully`);
  
}catch(err) {
    res.status(400).send("ERROR: " + error.message );

}
});


module.exports = profileRouter;