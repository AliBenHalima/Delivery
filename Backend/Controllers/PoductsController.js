
const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const ProductsModel = require("../Models/Products");
var multer  = require('multer')
// var upload = multer({ dest: './images' })
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime().toString() + '_' + file.originalname);
	}
});


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


      router.post('/AddProductTest', multer({storage: storage}).single("file"),(req, res, next) => {
        let url = req.protocol + "://" + req.get("host");
        if(!req.body){
          res.json({ success: false, message: 'insert a fuckiing body' });

        }
        console.log(url);
        if(!req.file){
          res.json({ success: false, message: 'no file' });
        }
        console.log(req.file);
        ProductsModel.findOne({
          name: req.body.name
        }).then((product) => {
          if (product) {
            console.log('product exsits');
          } else {
            const product = new ProductsModel({
             
              name : req.body.name,
              price : req.body.price,
              category : req.body.category,
              CookingTime : req.body.CookingTime,
              rating: req.body.rating,
              Promotion :req.body.Promotion,
              file: url + "/images/" + req.file.filename
            });
      
            product.save((err, movie) => {
              if (product) {
                //  console.log("ok");
                res.send({
                  id: product._id,
                  image: product.file
                });
              } else console.log(err);
            });
          }
        });
      });
      module.exports=router;