const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Registration", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    
}) .then(() => {
    console.log("Mongo CONNECTION OPEN!!!");
})
.catch(err => {
    console.log("ERROR!!")
    console.log(err);
})
