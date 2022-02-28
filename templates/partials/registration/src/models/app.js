const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
require("../db/conn");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const Register = require("../models/registers");
const static_path = path.join(__dirname ,'../../public');
app.use(express.static(static_path));
app.set('views',path.join(__dirname , '../../templates/views'));
app.set("view engine","ejs")

app.get("/register",(req,res)=>{
    res.render("index")
});
app.post("/registers", async(req,res)=>{
    try{
        const password = req.body.password;
        const cPassword = req.body.confirmPassword;
        if(password === cPassword){
            //adding content of form into the model
            const userRegistration = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword,
                gender : req.body.gender
            })

           const registered = await userRegistration.save();
           res.status(201).render("register")
        }else{
            res.send("Password Don't Match")
        }


    }catch{
        res.status(400).send(error);
    }
})

app.listen(port,()=>{
    console.log(`connected to the port no.${port}`)
})