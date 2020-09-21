"use strict";

var mongoose = require("mongoose");

var express = require("express");

var router = express.Router();

var UserModel = require("../Models/User");

var auth = require("../Routes/authentification");

var jwt = require('jsonwebtoken');

var _require = require("./Auth"),
    isAuth4User = _require.isAuth4User;

router.get("/All", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          UserModel.find(function (err, documents) {
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
router.get("/:id", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          UserModel.findOne({
            "_id": req.params.id
          }, function (err, docs) {
            if (!err) {
              res.send({
                data: docs
              });
            } else {
              res.send("Error");
            }
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/:name", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          UserModel.findOne({
            "username": req.params.username
          }, function (err, documents) {
            if (!err) {
              res.send({
                data: documents
              });
            } else {
              res.send("Error");
            }
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router["delete"]('/Delete/:id', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          UserModel.findById(req.params.id).then(function (user) {
            user.remove(function (err) {
              if (err) {
                res.json({
                  success: false,
                  message: err
                }); // Return error message
              } else {
                res.json({
                  success: true,
                  message: 'user removed!'
                }); // Return success message
              }
            });
          })["catch"](function (err) {
            console.log(err);
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;