const mongoose = require('mongoose');

const ReservationSchema=new mongoose.Schema({
    Email  :{type:String,required:true},
    PhoneNumber :{type:Number,required:true},
    Address:{type:String,required:true},
    Description :{type:String,required:true},
    Meal :{type:String,required:false},
    ForProduct :{type: mongoose.Schema.Types.ObjectId,ref:'Products', required: true }, // poster for which User
    ResevedFor :{type: mongoose.Schema.Types.ObjectId,ref:'User', required: true } // poster for which User
    });

    module.exports = mongoose.model('Reservation',ReservationSchema);
