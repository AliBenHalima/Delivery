"use strict";

var express = require("express");

var router = express.Router();

var UserModel = require("../Models/User");

var auth = require("../Routes/authentification");

var ProductsModel = require("../Models/Products");

var jwt = require('jsonwebtoken');

var Category = require("../Models/Category");

router.get("/All", function (req, res) {
  Category.find(function (err, documents) {
    if (!err) {
      res.send(documents);
    } else {
      res.send("Error");
    }
  });
});
router.post('/AddCategory', function _callee(req, res) {
  var category;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          category = new Category({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            CookingTime: req.body.CookingTime,
            rating: req.body.rating,
            Promotion: req.body.Promotion
          });
          category.save(function (err) {
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
                message: 'category has been successfully added '
              }); // Return success message
            }
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;