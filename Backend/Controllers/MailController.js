const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
// const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const MailMessage = require('../Models/MailMessage');
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
  try{

   
      await sendMail(users, (info) => {
        if(!users.Email || !users.Username || !users.Message){
          return res.send({success:false, status : " Verify your Credentials"});
        }
        let message = new MailMessage({
          Username : req.body.Username,
          Email : req.body.Email,
          Message : req.body.Message  
          });
          message.save((err) => {
          // Check if error
          if (err) {
            console.log(err)
                res.json({ success: false, status: err}); // Return error message
              } else{
                 res.send({success:true, status : " Mail sent successfully",data:info});

              }
        
  
  });
 
  })

}
  catch (err) {
    return res.send({success:false, status :"error  in sending mail , please check your credentials"});
  }
  
});

async function sendMail(users, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'alibenhalima60@gmail.com',
      pass: 'belieber2020'
    },
    tls:{rejectUnauthorized : false}
  });

  let mailOptions = {
    from: '"Contacts Service" <alibenhalima60@gmail.com>', // sender address
    to: users.Email, // list of receivers
    subject: "Wellcome to Our Website ", // Subject line
    html: `<h4>Hello ${users.Username} </h1><br>
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