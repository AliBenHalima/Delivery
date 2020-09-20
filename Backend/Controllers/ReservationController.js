
const  express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const auth = require("../Routes/authentification");
const ReservationModel = require("../Models/Reservation");
const jwt = require('jsonwebtoken');


router.get("/All",(req,res)=>{
    ReservationModel.find((err,documents)=>{
        if(!err){
            res.send( documents)
        }
        else{
            res.send("Error")
        }
    });
});


router.post('/AddReservation',(req,res)=>{
  const token = req.headers.authtoken;
  const decodedToken = jwt.verify(token, "my-secret-token");
  // Could be inserted in Authentification middleware
 

    let reservation = new ReservationModel({
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Address: req.body.Address,
      Description: req.body.Description,
      Meal:req.body.Meal,
      ResevedFor: decodedToken.userId,
      ForProduct : req.body.Product
    });

    reservation.save((err) => {
        // Check if error
        if (err) {
          // Check if error is a validation error
          if (err.errors) {
            // Check if validation error is in the title field
            if (err.errors.Email) {
              res.json({ success: false, message: err.errors.Email.message }); // Return error message
            } else {
              // Check if validation error is in the body field
              if (err.errors.PhoneNumber) {
                res.json({ success: false, message: err.errors.PhoneNumber.message }); // Return error message
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            }
          } else {
            res.json({ success: false, message: err }); // Return general error message
          }
        } else {
          res.json({ success: true, message: 'reservation has been made successfully' }); // Return success message
        }
      });})

      
      router.delete('/Delete/:id',async (req,res)=>{
        ReservationModel.findById(req.params.id).then((product) => {
          product.remove((err) => {
            if (err) {
              res.json({ success: false, message: err }); // Return error message
            } else {
              res.json({ success: true, message: 'Reservation deleted!' }); // Return success message
            }
          });
        }).catch(err=>
            {
                console.log(err);
            });

          });



          router.put('/UpdateReservation/:id',(req, res) => {
      
            // Check if id was provided
            if (!req.params.id) {
              res.json({ success: false, message: 'No reservation id provided' }); // Return error message
            } else {
              // Check if id exists in database
              ReservationModel.findOne({ _id: req.params.id }, (err, reservation) => {
                // Check if id is a valid ID
                if (err) {
                  res.json({ success: false, message: 'Not a valid reservation id' }); // Return error message
                } else {
                  // Check if id was found in the database
                  if (!reservation) {
                    res.json({ success: false, message: 'reservation id was not found.' }); // Return error message
                  }
                  else {
                     // Save latest blog title
                     reservation.State = req.body.State; 
                  
                     reservation.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'reservation Updated!' }); // Return success message
                      }
                    });
                  }
            }
          });
        } });















      module.exports=router;