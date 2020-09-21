const mongoose = require("mongoose");
const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const jwt = require('jsonwebtoken');
const { isAuth4User } = require("./Auth");



router.get("/All",async (req,res)=>{
    UserModel.find((err,documents)=>{
        if(!err){
            res.send(documents)
        }
        else{
            res.send("Error")
        }
    });
});

router.get("/:id",async (req,res)=>{
    UserModel.findOne({ "_id": req.params.id },((err,docs)=>{
        if(!err){
            res.send({ data: docs })
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


router.delete('/Delete/:id',isAuth4User,async (req,res)=>{
    UserModel.findById(req.params.id).then((user) => {
        user.remove((err) => {
        if (err) {
          res.json({ success: false, message: err }); // Return error message
        } else {
          res.json({ success: true, message: 'user removed!' }); // Return success message
        }
      });
    }).catch(err=>
        {
            console.log(err);
        });

      });


module.exports=router;