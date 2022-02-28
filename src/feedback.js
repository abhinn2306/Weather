const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
    UserName:{
        type: String,
        required:true
    },
    Email:{
        type:String,
        required:true,
                
    },
    feedback:{
        type:String,
        required:true,       
    }

})

const Feedback = new mongoose.model("Feedback",feedSchema);
module.exports = Feedback; 