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
router.get("/:id", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Category.findOne({
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
router.post('/AddCategory', function _callee2(req, res) {
  var category;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          category = new Category({
            name: req.body.name
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
          return _context2.stop();
      }
    }
  });
});
module.exports = router;