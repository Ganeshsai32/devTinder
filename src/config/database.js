const mongoose = require("mongoose");


const connectDB = async() => {
await mongoose.connect(
    "mongodb+srv://dommetisaiganesh:5M0xb8m3SQFyGchB@namastenode.ikq04.mongodb.net/devTinder"
);
};

module.exports= connectDB;
