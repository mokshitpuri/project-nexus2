const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://mokshitp:moks1234@cluster1.2wrwgrk.mongodb.net/");

//check database connected or not 
connect.then(()=> {
    console.log("DATABASE CONNECTED!");
})
.catch(()=>{
    console.log("DATABASE NOT CONNECTED!");
});

//CREATE A SCHEMA
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

//collection Part
const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;