const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const ProductsModel = require("../Models/Products");
const jwt = require('jsonwebtoken');
const { isAuth4Product } = require("./Auth");


var multer  = require('multer');

// var upload = multer({ dest: './images' })
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime().toString() + '_' + file.originalname);
	}
});
let CheckUser =(req)=>{
  const token = req.headers.authtoken;
const decodedToken = jwt.verify(token, "my-secret-token");
return decodedToken.userId;
}


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


router.get("/:id",async (req,res)=>{
  ProductsModel.findOne({ "_id": req.params.id },((err,documents)=>{
      if(!err){
          res.send(documents)
      }
      else{
          res.send("Error")
      }
  }));
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

      router.delete('/Delete/:id',isAuth4Product,async (req,res)=>{
        ProductsModel.findById(req.params.id).then((product) => {
          product.remove((err) => {
            if (err) {
              res.json({ success: false, message: err }); // Return error message
            } else {
              res.json({ success: true, message: 'Product deleted!' }); // Return success message
            }
          });
        }).catch(err=>
            {
                console.log(err);
            });

          });

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

      router.get("/:category",(req,res)=>{
        ProductsModel.find({ category:req.params.category  },async(err,doc) =>{
            if(!err){
                res.send( {data:doc})
            }
            else{
                res.send("err")
            }
        });
    });
    


    router.put('/likeProduct', (req, res) => {
      console.log(CheckUser(req));
      // Check if id was passed provided in request body
      
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided.' }); // Return error message
      }else {
        if(!CheckUser(req)){
          res.json({ success: false, message: 'User not Logged in' }); // Return error message
        }
      else {
        // Search the database with id
        ProductsModel.findOne({ _id: req.body.id }, (err, product) => {
          // Check if error was encountered
         
          if (err) {
            res.json({ success: false, message: 'Invalid product id' }); // Return error message
          } else {
            // Check if id matched the id of a blog post in the database
            if (!product) {
              res.json({ success: false, message: 'That product was not found.' }); // Return error message
            } else {
                      // Check if the user who liked the post has already liked the blog post before
                      if (product.likedBy.includes(CheckUser(req))) {
                       
                        product.likes--;
                        const arrayIndex = product.likedBy.indexOf(CheckUser(req));
                         // Get the index of the username in the array for removal
                        product.likedBy.splice(arrayIndex, 1); // Remove user from array
                       // Increment likes
                       product.save((err) => {
                        // Check if error was found
                        if (err) {
                          res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                        } else {
                          res.json({ success: true, message: 'product disliked' ,prod:product}); // Return success message
                        }
                      });
                        // res.json({ success: true, message: 'product disliked',product:product });
                         // Return error message
                      } else {
                        // Check if user who liked post has previously disliked a post
                      
                          product.likedBy.push(CheckUser(req));
                          product.likes++;
                           // Add username to the array of likedBy array
                          // Save blog post data
                          product.save((err) => {
                            // Check if error was found
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'product liked!',prod:product }); // Return success message
                            }
                          });
                        }
                      
                      }
                    }
                  
  
              });
            }
          }});
  
  



          router.put('/UpdateProduct/:id',isAuth4Product,multer({storage: storage}).single("file"),(req, res) => {
            let url = req.protocol + "://" + req.get("host");
            // Check if id was provided
            if (!req.params.id) {
              res.json({ success: false, message: 'No Product id provided' }); // Return error message
            } else {
              // Check if id exists in database
              ProductsModel.findOne({ _id: req.params.id }, (err, product) => {
                // Check if id is a valid ID
                if (err) {
                  res.json({ success: false, message: 'Not a valid Product id' }); // Return error message
                } else {
                  // Check if id was found in the database
                  if (!product) {
                    res.json({ success: false, message: 'Product id was not found.' }); // Return error message
                  }
                  else {
                     // Save latest blog title
                     product.name = req.body.name; 
                     product.price = req.body.price;
                     product.category = req.body.category;
                     product.CookingTime = req.body.CookingTime;
                     product.file =   url + "/images/" + req.file.filename;// Save latest body

                     product.save((err) => {
                      if (err) {
                        if (err) {
                          res.json({ success: false, message: err });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'product Updated!' }); // Return success message
                      }
                    });
                  }
            }
          });
        } });

        
      module.exports=router;