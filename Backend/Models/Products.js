const mongoose = require('mongoose');

const ProductSchema=new mongoose.Schema({
    name :{type:String,required:true},
    price  :{type:Number,required:true},
    category :{type:String,required:true},
    CookingTime:{type:String,required:true},
    rating:{type:Number,required:false},
    Promotion: {type:Boolean,required:false}
    });

    module.exports = mongoose.model('Product',ProductSchema);
