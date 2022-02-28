const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 8000;
const static_path = path.join(__dirname,'../public');
const Feedback = require("./feedback")
const nodemailer = require ("nodemailer");

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}



mongoose.connect("mongodb+srv://abhinn23:atlasuser007@cluster0.llq1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    
}) .then(() => {
    console.log("Mongo CONNECTION OPEN!!!");
})
.catch(err => {
    console.log("ERROR!!")
    console.log(err);
})
require('./db/conn');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(static_path));
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"../templates/views"))
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/weather",(req,res)=>{
    res.render("weather")
})

app.get("/feedback",(req,res)=>{
    res.render("feedback")

})
app.get("/thanks",(req,res)=>{
    res.render("thanks")
})
app.post("/thanks",async(req,res)=>{
    try{
        const userFeedback = new Feedback({
            UserName : req.body.UserName ,
            Email : req.body.Email ,
            feedback : req.body.feedback,         

        })       
        const Feed_done = await userFeedback.save();
        const output = `<p>You have new Feedback:</p>
    <h2>Feedback Details:</h2>
    <ul>
    <li>User Name:${req.body.UserName}</li>
    <li>User Email:${req.body.Email}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.feedback}</p>
    `;
    // async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'bossboss2306@outlook.com', // generated ethereal user
        pass: 'Jaishrikrishna', // generated ethereal password
      },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Weather Feedback" <bossboss2306@outlook.com>', // sender address
      to: "abhinn2002pal@gmail.com", // list of receivers
      subject: "Feedback Form", // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
  }
  main().catch(console.error);
    
        res.status(201).render("thanks");

    }catch(error){
        res.status(400).send(error);
    }
    
    

})


app.get("*",(req,res)=>{
    res.render("404page")

})
app.listen(port,()=>{
    console.log(`connected to ${port}`);
})