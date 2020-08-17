const mongoose = require("mongoose");
const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const jwt = require('jsonwebtoken');


router.get("/All",async (req,res)=>{
    UserModel.find((err,documents)=>{
        if(!err){
            res.send({ data: documents, "info":req.verified })
        }
        else{
            res.send("Error")
        }
    });
});

router.get("/:id",async (req,res)=>{
    UserModel.findOne({ "_id": req.params.id },((err,documents)=>{
        if(!err){
            res.send({ data: documents })
        }
        else{
            res.send("Error")
        }
    }));
});

router.get("/:name",async (req,res)=>{
    UserModel.findOne({ "username": req.params.username },((err,documents)=>{
        if(!err){
            res.send({ data: documents })
        }
        else{
            res.send("Error")
        }
    }));
}
);


module.exports=router;