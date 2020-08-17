
const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const ProductsModel = require("../Models/Products");


router.get("/All",(req,res)=>{
    ProductsModel.find((err,documents)=>{
        if(!err){
            res.send( documents)
        }
        else{
            res.send("Error")
        }
    });
});


router.post('/AddProduct',async (req,res)=>{
    let product = new ProductsModel({
        name : req.body.name,
        price : req.body.price,
        category : req.body.category,
        CookingTime : req.body.CookingTime,
        rating: req.body.rating,
        Promotion :req.body.Promotion
        
    });
    product.save((err) => {
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
          res.json({ success: true, message: 'Product has been added successfully' }); // Return success message
        }
      });})

      module.exports=router;