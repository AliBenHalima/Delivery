
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const UsersController = require('./Controllers/UsersController');
const SignController = require('./Controllers/SignController');
const ProductController=require('./Controllers/PoductsController');
const ReservationController=require('./Controllers/ReservationController');
const MailController=require('./Controllers/MailController');
const CommentController=require('./Controllers/CommentController');

app.use(cors());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use("/User",cors(corsOptions),UsersController);
app.use("/Sign",SignController);
app.use("/Product",ProductController);
app.use("/Reservation",ReservationController);
app.use("/Mail",MailController);
app.use("/Comment",CommentController);




app.use('/images', express.static(__dirname + '/images'));
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, './images');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, new Date().getTime().toString() + '_' + file.originalname);
// 	}
// });

// app.use(multer({storage: storage}).single("file"));
app.use(express.static(__dirname + '/images'));
mongoose
  .connect(
    "mongodb+srv://Ali:mypassword@cluster0.jdfda.mongodb.net/<Delivery>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("Connection successfully established");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err); 
  });
