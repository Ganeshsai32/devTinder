const validator = require("validator");

const validateSignUpData= (req) => {

    const {firstName,lastName, emailId,passWord} =req.body;
    if(!firstName|| !lastName){
        throw new Error("Name is not valid");
    }

    else if (!validator.isEmail(emailId)){
        throw new Error("E mail Name is not valid");
    }

    else if (!validator.isStrongPassword(passWord)){
        throw new Error("set stron password");
    }
    
};

const validateEditProfileData= (req) =>{

    const allowedEditFields = ["firstName","lastName"];

    const isEditAllowed = Object.keys(req.body).every((field) =>
         allowedEditFields.includes(field)
);

return isEditAllowed;
};

module.exports ={
    validateSignUpData,
    validateEditProfileData,
};