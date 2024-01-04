const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const port = 5000;

app.get('/backend' , (req,res)=>{
    const message = req.body.message;
    
console.log(message);
    res.send("Shrinivas says i like u to anushka");
})

app.listen(port , ()=>{
    console.log("App is listening");
})
