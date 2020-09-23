"use strict";

var express = require("express");

var router = express.Router();

var UserModel = require("../Models/User");

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var auth = require("../Routes/authentification");

var nodemailer = require('nodemailer');

router.post("/SignUp", function (req, res, next) {
  var users;
  users = req.body;

  if (req.body.Email && req.body.Username && req.body.Password && req.body.Address && req.body.Phonenumber) {
    UserModel.findOne({
      Email: req.body.Email
    }).then(function (user) {
      if (user) {
        console.log('user_exist');
        res.json({
          error: 'this user is already exit'
        });
      } else {
        console.log("enter");
        bcrypt.hash(req.body.Password, 12).then(function (hashedPwd) {
          console.log(req.body.Password);
          console.log(hashedPwd);
          var user = new UserModel({
            Username: req.body.Username,
            Email: req.body.Email,
            Password: hashedPwd,
            Address: req.body.Address,
            Phonenumber: req.body.Phonenumber,
            role: "Admin"
          });
          user.save().then(function _callee(user) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(sendMail(users, function (info) {
                      if (!users.Email || !users.Username) {
                        return res.send({
                          success: false,
                          status: " Verify your Credentials"
                        });
                      }

                      return res.send({
                        success: true,
                        status: " Mail sent successfully",
                        data: info,
                        user: user,
                        SignUpSucceed: "Sign up Succeeded"
                      });
                    }));

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })["catch"](function (err) {
            return console.log(err);
          });
        });
      }
    });
  } else if (!req.body.Email && !req.body.Password && !req.body.Username) res.json({
    error: 'Please Fill in the fields'
  });else if (!req.body.Username) res.json({
    error: 'Please enter the username'
  });else if (!req.body.Email) res.json({
    error: 'Please enter your Email'
  });else if (!req.body.Password) res.json({
    error: 'Please enter Your Password'
  });else if (!req.body.Address) res.json({
    error: 'Please enter Your Address'
  });else if (!req.body.Phonenumber) res.json({
    error: 'Please enter Your Phone Number'
  });
});
router.post("/SignIn", function (req, res, next) {
  if (req.body.Email && req.body.Password) {
    UserModel.findOne({
      Email: req.body.Email
    }).then(function (user) {
      if (user) {
        bcrypt.compare(req.body.Password, user.Password).then(function (bool) {
          if (bool) {
            console.log('logged in', user._id);
            var token = jwt.sign({
              email: req.body.email,
              userId: user._id,
              role: user.role
            }, "my-secret-token");
            console.log(token);
            res.header("authtoken", token).send({
              token: token,
              status: "POST SUCCEEDED",
              userId: user._id,
              username: user.Username,
              role: user.role
            }); // res.json({token:token,status:"all good"});
            // res.json();
          } else {
            console.log('no match');
            res.json({
              status: 'wrong password'
            });
          }
        })["catch"](function (err) {
          console.log(err);
        });
      } else res.json({
        status: 'The email and password you entred did not match our records'
      });
    });
  } else if (!req.body.Email && !req.body.Password) res.json({
    status: 'Email & Password are required'
  });else if (!req.body.Email) res.json({
    status: 'Please enter your Email'
  });else res.json({
    status: 'Please enter Your Password'
  });
}), function (err) {
  console.log(err);
};

function sendMail(users, callback) {
  var transporter, mailOptions, info;
  return regeneratorRuntime.async(function sendMail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // create reusable transporter object using the default SMTP transport
          transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // true for 465, false for other ports
            auth: {
              user: 'alibenhalima60@gmail.com',
              pass: 'belieber2020'
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          mailOptions = {
            from: '"Contacts Service" <alibenhalima60@gmail.com>',
            // sender address
            to: users.Email,
            // list of receivers
            subject: "Wellcome to Our Website ",
            // Subject line
            html: "<h4>Hi ".concat(users.Username, " </h1><br>\n      <h4>Thanks for Joining ,Welcome to our restaurant</h4>")
          }; // send mail with defined transport object

          _context2.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions, function (error, infos) {
            if (error) {
              console.log("Hello Ali" + error);
            } else {
              console.log("information :" + infos);
              res.send("Mail sent successfully");
            }
          }));

        case 4:
          info = _context2.sent;
          callback(info);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = router;