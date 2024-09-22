const express = require("express");

const app= express();

app.use("/test",(req,res)=>{
    res.send("dshgfjysdgcfhdbvg");
});

app.use((req,res)=>{
    res.send("as soon as possible")

});

app.use((req,res)=>{
    res.send("sdufgudscgvhmdbcvjhyydgd");
});

app.listen(3000,()=>{
    console.log("server is sucessfully  on port777");

});
