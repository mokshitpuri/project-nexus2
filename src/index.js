const express= require('express');
const path = require("path");
const bcrypt= require("bcrypt");
const collection = require("./config")

const app = express();
//convert data in json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use EJS as the view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
})

//Register User
app.post("/signup", async(req, res) => {
    const data= {
        name: req.body.username,
        passsword: req.body.passsword
    }


    //check if user already exists
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists. please choose different username")
    }else{
        //hash the password using becrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.passsword, saltRounds);

        data.passsword= hashedPassword;


    const userdata= await collection.insertMany(data);
    console.log(userdata);
    }
});


//Login
app.post("/login", async (req, res)=> {
        try{
            const check= await collection.findOne({name: req.body.username});
            if(!check){
                res.send("username not found");
            }
            const isPasswordMatch= await bcrypt.compare(req.body.passsword, check.passsword);
            if(isPasswordMatch){
                res.render("home");
            }else{
                req.send("wrong password");
            }
        }catch{
            res.send("wrong details.")
        }
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})