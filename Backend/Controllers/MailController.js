const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
// const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
// const cors = require('cors');
// const app = express();
// app.use(cors());
router.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome </h1>"
  );
});

router.post("/sendmail",async (req, res) => {
  console.log("request came",req.body);
  let users = req.body;
  console.log(users);
  res.send(await sendMail(users, info => {
    console.log(`The mail has beed send `);
    return res.send({status : " Mail sent successfully",data:info});
  }));
  
});

async function sendMail(users, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'alibenhalima60@gmail.com',
      pass: 'belieber2016'
    },
    tls:{rejectUnauthorized : false}
  });

  let mailOptions = {
    from: '"Contacts Service" <alibenhalima60@gmail.com>', // sender address
    to: users.email, // list of receivers
    subject: "Wellcome to Our Website ", // Subject line
    html: `<h4>Hi ${users.username} </h1><br>
    <h4>Thanks for Contacting Us, we will reply to you as soon as we can</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions,(error,infos)=>{
    if(error){
       console.log("Hello Ali"+ error)
    }else{
      console.log("information :" + infos)
      res.send("Mail sent successfully")
    }
  });

  callback(info);
}

// main().catch(console.error);
module.exports = router;