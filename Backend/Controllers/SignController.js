
const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../Routes/authentification");
const nodemailer = require('nodemailer');

router.post("/SignUp",(req,res,next)=>{
    let users;
    users = req.body;
    if(req.body.Email && req.body.Username && req.body.Password && req.body.Address && req.body.Phonenumber){
        UserModel.findOne({Email:req.body.Email})
            .then(user=>{
                if(user)
                {
                    console.log('user_exist');
                    res.json({error:'this user is already exit'});
                }
                else{
                        console.log("enter");
                        bcrypt.hash(req.body.Password,12)
                        .then(hashedPwd=>{
                            console.log(req.body.Password);
                            console.log(hashedPwd);
                            const user = new UserModel({
                                Username:req.body.Username,
                                Email:req.body.Email,
                                Password:hashedPwd,
                                Address:req.body.Address,
                                Phonenumber:req.body.Phonenumber,
                                role:"User",
                              
                            });
                            user
                              .save()
                              .then(async (user) =>{ 
                                // res.json({user:user,SignUpSucceed:"Sign up Succeeded"})
      await sendMail(users, (info) => {
        if(!users.Email || !users.Username ){
          return res.send({success:false, status : " Verify your Credentials"});
        }
        
          return res.send({success:true, status : " Mail sent successfully",data:info,user:user,SignUpSucceed:"Sign up Succeeded"});
        
  
  })
                            
                            
                            })
                              .catch( (err) => console.log(err) );
                        });
                }
                });
    
        }
        else if (!req.body.Email&&!req.body.Password&&!req.body.Username)
        res.json({error:'Please Fill in the fields'});
        else if (!req.body.Username)
        res.json({error:'Please enter the username'});
        else if(!req.body.Email)
        res.json({error:'Please enter your Email'});
        else if(!req.body.Password)
        res.json({error:'Please enter Your Password'});
        else if(!req.body.Address)
        res.json({error:'Please enter Your Address'});
        else if(!req.body.Phonenumber)
        res.json({error:'Please enter Your Phone Number'});
      }
);

router.post("/SignIn",(req,res,next)=>
{
     if(req.body.Email&&req.body.Password){
        UserModel.findOne({Email:req.body.Email})
        .then(user=>{
            if(user)
            {  bcrypt.compare(req.body.Password,user.Password)
               .then(bool=>{
                if(bool)
                {
                    console.log('logged in',user._id);
                    const token = jwt.sign({email:req.body.email,userId:user._id,role:user.role},"my-secret-token");

                    console.log(token);
                   res.header("authtoken",token).send({token:token,status:"POST SUCCEEDED",userId:user._id,username:user.Username,role:user.role});

                    // res.json({token:token,status:"all good"});
                    // res.json();
                }
                else
                {
                    console.log('no match');
                    res.json({status:'wrong password'});
                }
               })
               .catch(err=>
                {
                    console.log(err);
                });
            }
            else
              res.json({status:'The email and password you entred did not match our records'});
        });
    }
    else if (!req.body.Email&&!req.body.Password)
      res.json({status:'Email & Password are required'});
    else if(!req.body.Email)
      res.json({status:'Please enter your Email'});
    else
      res.json({status:'Please enter Your Password'});
}),(err)=>{ console.log(err)}




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
      html: `<h4>Hi ${users.Username} </h1><br>
      <h4>Thanks for Joining ,Welcome to our restaurant</h4>`
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
  

module.exports=router;