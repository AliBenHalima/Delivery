"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var router = express.Router(); // const exphbs = require('express-handlebars');

var path = require('path');

var nodemailer = require('nodemailer');

var MailMessage = require('../Models/MailMessage'); // const cors = require('cors');
// const app = express();
// app.use(cors());


router.get("/", function (req, res) {
  res.send("<h1 style='text-align: center'>Wellcome </h1>");
});
router.post("/sendmail", function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("request came", req.body);
          users = req.body;
          console.log(users);
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(sendMail(users, function (info) {
            if (!users.Email || !users.Username || !users.Message) {
              return res.send({
                success: false,
                status: " Verify your Credentials"
              });
            }

            var message = new MailMessage({
              Username: req.body.Username,
              Email: req.body.Email,
              Message: req.body.Message
            });
            message.save(function (err) {
              // Check if error
              if (err) {
                console.log(err);
                res.json({
                  success: false,
                  status: err
                }); // Return error message
              } else {
                res.send({
                  success: true,
                  status: " Mail sent successfully",
                  data: info
                });
              }
            });
          }));

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", res.send({
            success: false,
            status: "error  in sending mail , please check your credentials"
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 8]]);
});

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
            html: "<h4>Hello ".concat(users.Username, " </h1><br>\n    <h4>Thanks for Contacting Us, we will reply to you as soon as we can</h4>")
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
} // main().catch(console.error);


module.exports = router;