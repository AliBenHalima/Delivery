const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const ProductsModel = require("../Models/Products");
const jwt = require('jsonwebtoken');
const Category = require("../Models/Category");


router.get("/All",(req,res)=>{
    Category.find((err,documents)=>{
        if(!err){
            res.send( documents)
        }
        else{
            res.send("Error")
        }
    });
});

router.get("/:id",async (req,res)=>{
  Category.findOne({ "_id": req.params.id },((err,documents)=>{
      if(!err){
          res.send(documents)
      }
      else{
          res.send("Error")
      }
  }));
});



router.post('/AddCategory',async (req,res)=>{
    let category = new Category({
        name : req.body.name,
      });
    category.save((err) => {
        // Check if error
        if (err) {
          // Check if error is a validation error
          if (err.errors) {
            // Check if validation error is in the title field
            if (err.errors.title) {
              res.json({ success: false, message: err.errors.title.message }); // Return error message
            } else {
              // Check if validation error is in the body field
              if (err.errors.body) {
                res.json({ success: false, message: err.errors.body.message }); // Return error message
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            }
          } else {
            res.json({ success: false, message: err }); // Return general error message
          }
        } else {
          res.json({ success: true, message: 'category has been successfully added ' }); // Return success message
        }
      });})
























      
    module.exports=router;  