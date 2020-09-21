"use strict";

var express = require("express");

var router = express.Router();

var UserModel = require("../Models/User");

var auth = require("../Routes/authentification");

var ReservationModel = require("../Models/Reservation");

var jwt = require('jsonwebtoken');

var _require = require("./Auth"),
    isAuth4Reservation = _require.isAuth4Reservation;

router.get("/All", isAuth4Reservation, function (req, res) {
  ReservationModel.find(function (err, documents) {
    if (!err) {
      res.send(documents);
    } else {
      res.send("Error");
    }
  });
});
router.post('/AddReservation', function (req, res) {
  var token = req.headers.authtoken;
  var decodedToken = jwt.verify(token, "my-secret-token"); // Could be inserted in Authentification middleware

  var reservation = new ReservationModel({
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    Address: req.body.Address,
    Description: req.body.Description,
    Meal: req.body.Meal,
    ResevedFor: decodedToken.userId,
    ForProduct: req.body.Product
  });
  reservation.save(function (err) {
    // Check if error
    if (err) {
      // Check if error is a validation error
      if (err.errors) {
        // Check if validation error is in the title field
        if (err.errors.Email) {
          res.json({
            success: false,
            message: err.errors.Email.message
          }); // Return error message
        } else {
          // Check if validation error is in the body field
          if (err.errors.PhoneNumber) {
            res.json({
              success: false,
              message: err.errors.PhoneNumber.message
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
        message: 'reservation has been made successfully'
      }); // Return success message
    }
  });
});
router["delete"]('/Delete/:id', isAuth4Reservation, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ReservationModel.findById(req.params.id).then(function (product) {
            product.remove(function (err) {
              if (err) {
                res.json({
                  success: false,
                  message: err
                }); // Return error message
              } else {
                res.json({
                  success: true,
                  message: 'Reservation deleted!'
                }); // Return success message
              }
            });
          })["catch"](function (err) {
            console.log(err);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.put('/UpdateReservation/:id', isAuth4Reservation, function (req, res) {
  // Check if id was provided
  if (!req.params.id) {
    res.json({
      success: false,
      message: 'No reservation id provided'
    }); // Return error message
  } else {
    // Check if id exists in database
    ReservationModel.findOne({
      _id: req.params.id
    }, function (err, reservation) {
      // Check if id is a valid ID
      if (err) {
        res.json({
          success: false,
          message: 'Not a valid reservation id'
        }); // Return error message
      } else {
        // Check if id was found in the database
        if (!reservation) {
          res.json({
            success: false,
            message: 'reservation id was not found.'
          }); // Return error message
        } else {
          // Save latest blog title
          reservation.State = req.body.State;
          reservation.save(function (err) {
            if (err) {
              if (err.errors) {
                res.json({
                  success: false,
                  message: 'Please ensure form is filled out properly'
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
                message: 'reservation Updated!'
              }); // Return success message
            }
          });
        }
      }
    });
  }
});
module.exports = router;