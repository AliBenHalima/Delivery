"use strict";

var mongoose = require("mongoose");

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cors = require('cors');

var multer = require('multer');

var UsersController = require('./Controllers/UsersController');

var SignController = require('./Controllers/SignController');

var ProductController = require('./Controllers/PoductsController');

var ReservationController = require('./Controllers/ReservationController');

var MailController = require('./Controllers/MailController');

var CommentController = require('./Controllers/CommentController');

var CategoryController = require('./Controllers/CategoryController');

var _require = require("./Controllers/Auth"),
    isAuth4Reservation = _require.isAuth4Reservation,
    isAuth4Product = _require.isAuth4Product,
    isAuth4User = _require.isAuth4User;

app.use(cors());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/User", cors(corsOptions), UsersController);
app.use("/Sign", SignController);
app.use("/Product", ProductController);
app.use("/Reservation", ReservationController);
app.use("/Mail", MailController);
app.use("/Comment", CommentController);
app.use("/Category", CategoryController);
app.use('/images', express["static"](__dirname + '/images')); // const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, './images');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, new Date().getTime().toString() + '_' + file.originalname);
// 	}
// });
// app.use(multer({storage: storage}).single("file"));

app.use(express["static"](__dirname + '/images'));
mongoose.connect("mongodb+srv://Ali:mypassword@cluster0.jdfda.mongodb.net/<Delivery>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  console.log("Connection successfully established");
  app.listen(3000);
})["catch"](function (err) {
  console.log(err);
});