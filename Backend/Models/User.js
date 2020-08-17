const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    Username :{type:String,required:true},
    Email  :{type:String,required:true},
    Password :{type:String,required:true},
    Address :{type:String,required:true},
    Phonenumber:{type:Number,required:true},
    role: {type:String,required:false}
    });

    module.exports = mongoose.model('User',userSchema);
