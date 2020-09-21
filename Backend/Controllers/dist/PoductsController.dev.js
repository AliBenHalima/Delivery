"use strict";

var express = require("express");

var router = express.Router();

var UserModel = require("../Models/User");

var auth = require("../Routes/authentification");

var ProductsModel = require("../Models/Products");

var jwt = require('jsonwebtoken');

var multer = require('multer'); // var upload = multer({ dest: './images' })


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './images');
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime().toString() + '_' + file.originalname);
  }
});

var CheckUser = function CheckUser(req) {
  var token = req.headers.authtoken;
  var decodedToken = jwt.verify(token, "my-secret-token");
  return decodedToken.userId;
};

router.get("/All", function (req, res) {
  ProductsModel.find(function (err, documents) {
    if (!err) {
      res.send(documents);
    } else {
      res.send("Error");
    }
  });
});
router.get("/:id", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ProductsModel.findOne({
            "_id": req.params.id
          }, function (err, documents) {
            if (!err) {
              res.send(documents);
            } else {
              res.send("Error");
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/AddProduct', function _callee2(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          product = new ProductsModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            CookingTime: req.body.CookingTime,
            rating: req.body.rating,
            Promotion: req.body.Promotion
          });
          product.save(function (err) {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.title) {
                  res.json({
                    success: false,
                    message: err.errors.title.message
                  }); // Return error message
                } else {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({
                      success: false,
                      message: err.errors.body.message
                    }); // Return error message
                  } else {
                    res.json({
                      success: false,
                      message: err
                    }); // Return general error message
                  }
                }
              } else {
                res.json({
                  success: false,
                  message: err
                }); // Return general error message
              }
            } else {
              res.json({
                success: true,
                message: 'Product has been added successfully'
              }); // Return success message
            }
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]('/Delete/:id', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ProductsModel.findById(req.params.id).then(function (product) {
            product.remove(function (err) {
              if (err) {
                res.json({
                  success: false,
                  message: err
                }); // Return error message
              } else {
                res.json({
                  success: true,
                  message: 'Product deleted!'
                }); // Return success message
              }
            });
          })["catch"](function (err) {
            console.log(err);
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/AddProductTest', multer({
  storage: storage
}).single("file"), function (req, res, next) {
  var url = req.protocol + "://" + req.get("host");

  if (!req.body) {
    res.json({
      success: false,
      message: 'insert a fuckiing body'
    });
  }

  console.log(url);

  if (!req.file) {
    res.json({
      success: false,
      message: 'no file'
    });
  }

  console.log(req.file);
  ProductsModel.findOne({
    name: req.body.name
  }).then(function (product) {
    if (product) {
      console.log('product exsits');
    } else {
      var _product = new ProductsModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        CookingTime: req.body.CookingTime,
        rating: req.body.rating,
        Promotion: req.body.Promotion,
        file: url + "/images/" + req.file.filename
      });

      _product.save(function (err, movie) {
        if (_product) {
          //  console.log("ok");
          res.send({
            id: _product._id,
            image: _product.file
          });
        } else console.log(err);
      });
    }
  });
});
router.get("/:category", function (req, res) {
  ProductsModel.find({
    category: req.params.category
  }, function _callee4(err, doc) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!err) {
              res.send({
                data: doc
              });
            } else {
              res.send("err");
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});
router.put('/likeProduct', function (req, res) {
  console.log(CheckUser(req)); // Check if id was passed provided in request body

  if (!req.body.id) {
    res.json({
      success: false,
      message: 'No id was provided.'
    }); // Return error message
  } else {
    if (!CheckUser(req)) {
      res.json({
        success: false,
        message: 'User not Logged in'
      }); // Return error message
    } else {
      // Search the database with id
      ProductsModel.findOne({
        _id: req.body.id
      }, function (err, product) {
        // Check if error was encountered
        if (err) {
          res.json({
            success: false,
            message: 'Invalid product id'
          }); // Return error message
        } else {
          // Check if id matched the id of a blog post in the database
          if (!product) {
            res.json({
              success: false,
              message: 'That product was not found.'
            }); // Return error message
          } else {
            // Check if the user who liked the post has already liked the blog post before
            if (product.likedBy.includes(CheckUser(req))) {
              product.likes--;
              var arrayIndex = product.likedBy.indexOf(CheckUser(req)); // Get the index of the username in the array for removal

              product.likedBy.splice(arrayIndex, 1); // Remove user from array
              // Increment likes

              product.save(function (err) {
                // Check if error was found
                if (err) {
                  res.json({
                    success: false,
                    message: 'Something went wrong.'
                  }); // Return error message
                } else {
                  res.json({
                    success: true,
                    message: 'product disliked',
                    prod: product
                  }); // Return success message
                }
              }); // res.json({ success: true, message: 'product disliked',product:product });
              // Return error message
            } else {
              // Check if user who liked post has previously disliked a post
              product.likedBy.push(CheckUser(req));
              product.likes++; // Add username to the array of likedBy array
              // Save blog post data

              product.save(function (err) {
                // Check if error was found
                if (err) {
                  res.json({
                    success: false,
                    message: 'Something went wrong.'
                  }); // Return error message
                } else {
                  res.json({
                    success: true,
                    message: 'product liked!',
                    prod: product
                  }); // Return success message
                }
              });
            }
          }
        }
      });
    }
  }
});
router.put('/UpdateProduct/:id', multer({
  storage: storage
}).single("file"), function (req, res) {
  var url = req.protocol + "://" + req.get("host"); // Check if id was provided

  if (!req.params.id) {
    res.json({
      success: false,
      message: 'No Product id provided'
    }); // Return error message
  } else {
    // Check if id exists in database
    ProductsModel.findOne({
      _id: req.params.id
    }, function (err, product) {
      // Check if id is a valid ID
      if (err) {
        res.json({
          success: false,
          message: 'Not a valid Product id'
        }); // Return error message
      } else {
        // Check if id was found in the database
        if (!product) {
          res.json({
            success: false,
            message: 'Product id was not found.'
          }); // Return error message
        } else {
          // Save latest blog title
          product.name = req.body.name;
          product.price = req.body.price;
          product.category = req.body.category;
          product.CookingTime = req.body.CookingTime;
          product.file = url + "/images/" + req.file.filename; // Save latest body

          product.save(function (err) {
            if (err) {
              if (err) {
                res.json({
                  success: false,
                  message: err
                });
              } else {
                res.json({
                  success: false,
                  message: err
                }); // Return error message
              }
            } else {
              res.json({
                success: true,
                message: 'product Updated!'
              }); // Return success message
            }
          });
        }
      }
    });
  }
});
module.exports = router;