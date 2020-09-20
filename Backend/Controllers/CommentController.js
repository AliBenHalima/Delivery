const  express = require("express");
const mongoose = require("mongoose");
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
// const test =require('./test.json');

const router = express.Router();
// const FilmModel = mongoose.model("movies");
const Comment = require('../Models/Comment');
// const review = require('../Model/review');
let CheckUser =(req)=>{
  const token = req.headers.authtoken;
const decodedToken = jwt.verify(token, "my-secret-token");
return decodedToken.userId;
}

router.get("/list",async (req,res)=>{

  Comment.find((err,docs)=>{
      if(!err){
        res.json({ success: false, data: docs }); // Return error message
      }
      else{
          res.send("Error")
      }
  });
});


// router.get("/liste",async (req,res)=>{
// const data = test;
//           // console.log(resu);
 
//           res.send(data);
   
// });
// const fetch = require("node-fetch");
// router.get("/listee",async (req,res)=>{
//   const data= await fetch('http://localhost:3000/comments/liste');
//   const resu = await data.text();

//           console.log(resu);
 
//           res.send(resu);
   
// });


router.get("/:id",async (req,res)=>{
  // console.log( req.userData.userId);
  // console.log( req.userData.userId);
  Comment.find({ _id: req.params.id },((err,docs)=>{
    if(!err){
        res.send({ data: docs })
    }
    else{
        res.send("Product doesnt exist!? ")
    }
}));
});


router.get("/Reviews/:id",async (req,res)=>{
  review.find({ PostedFor: req.params.id },((err,docs)=>{
    if(!err){
        res.send({ data: docs })
    }
    else{
        res.send("Movie doesnt exist!? ")
    }
}));
});

router.get("/Reviews/Rating/:id",async (req,res)=>{
  review.find({ PostedFor: req.params.id },((err,docs)=>{
    if(!err){
        res.send({ data: docs })
    }
    else{
        res.send("Movie doesnt exist!? ")
    }
}));
});


router.post('/newComment', (req, res) => {
// const token = req.headers.authtoken;
// const decodedToken = jwt.verify(token, "my-secret-token");

    console.log(req.body);
      // Check if blog body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'Comment is empty!' }); // Return error message
      } else {
        // Check if blog's creator was provided
        if (!CheckUser(req)) {
          res.json({ success: false, message: 'You must Log in first!' }); // Return error
        } else {
          // Create the blog object for insertion into database
          const Comment_ = new Comment({
            body: req.body.body, // Body field
            createdBy: CheckUser(req),
            createdAt: req.body.createdAt,
            PostedFor: req.body.PostedFor, // CreatedBy field // errror heere !!!!!!!!!!!
          });
          // Save blog into database
          Comment_.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.body) {
                  res.json({ success: false, message: err.errors.body.message }); // Return error message
                } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Comment Added' }); // Return success message
            }
          });
        }
      }
    
  });

  router.get('/publicProfile', (req, res) => {
    // Check if username was passed in the parameters
    if (!req.params.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error message
    } else {
      // Check the database for username
      User.findOne({ username: req.params.username }).select('username email').exec((err, user) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Something went wrong.' }); // Return error message
        } else {
          // Check if user was found in the database
          if (!user) {
            res.json({ success: false, message: 'Username not found.' }); // Return error message
          } else {
            console.log( user.username );
            res.json( user.username ); // Return the public user's profile data
          }
        }
      });
    }
  });



  router.put('/likeComment', (req, res) => {
    console.log(req.body);
    // Check if id was passed provided in request body
    
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    }else {
      if(!CheckUser(req)){
        res.json({ success: false, message: 'User not Logged in' }); // Return error message
      }
    else {
      // Search the database with id
      Comment.findOne({ _id: req.body.id }, (err, comment) => {
        // Check if error was encountered
        if (err) {
          res.json({ success: false, message: 'Invalid Comment id' }); // Return error message
        } else {
          // Check if id matched the id of a blog post in the database
          if (!comment) {
            res.json({ success: false, message: 'That Comment was not found.' }); // Return error message
          } else {
                    // Check if the user who liked the post has already liked the blog post before
                    if (comment.likedBy.includes(CheckUser(req))) {
                      comment.likes--;
                      const arrayIndex = comment.likedBy.indexOf(CheckUser(req)); // Get the index of the username in the array for removal
                      comment.likedBy.splice(arrayIndex, 1); // Remove user from array
                     // Increment likes

                      res.json({ success: false, message: 'You already liked this post.' });
                       // Return error message
                    } else {
                      // Check if user who liked post has previously disliked a post
                      if (comment.dislikedBy.includes(CheckUser(req))) {
                        comment.dislikes--; // Reduce the total number of dislikes
                        const arrayIndex = comment.dislikedBy.indexOf(CheckUser(req)); // Get the index of the username in the array for removal
                        comment.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                        comment.likes++; // Increment likes
                        comment.likedBy.push(CheckUser(req)); // Add username to the array of likedBy array
                        // Save blog post data
                        comment.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Comment liked!' }); // Return success message
                          }
                        });
                      } else {
                        comment.likes++; // Incriment likes
                        comment.likedBy.push(CheckUser(req)); // Add liker's username into array of likedBy
                        // Save blog post
                        comment.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'Comment liked!' }); // Return success message
                          }
                        });
                      }
                    }
                  }
                }

            });
          }
        }});



  router.put('/dislikeComment', (req, res) => {
   // console.log(req.body.username);
    // Check if id was provided inside the request body
    console.log(req.body);
  
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    }else {
      if(!CheckUser(req)){
        res.json({ success: false, message: 'User not Logged in !' }); // Return error message
      }
    else {
      // Search database for blog post using the id
      Comment.findOne({ _id: req.body.id }, (err, comment) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid comment id' }); // Return error message
        } else {
          // Check if blog post with the id was found in the database
          if (!comment) {
            res.json({ success: false, message: 'That blog was not found.' }); // Return error message
          } else {
            // Get data of user who is logged in

                    // Check if user who disliked post has already disliked it before
                    if (comment.dislikedBy.includes(CheckUser(req))) {
                      res.json({ success: false, message: 'You already disliked this post.' }); // Return error message
                    } else {
                      // Check if user has previous disliked this post
                      if (comment.likedBy.includes(CheckUser(req))) {
                        comment.likes--; // Decrease likes by one
                        const arrayIndex = comment.likedBy.indexOf(CheckUser(req)); // Check where username is inside of the array
                        comment.likedBy.splice(arrayIndex, 1); // Remove username from index
                        comment.dislikes++; // Increase dislikeds by one
                        comment.dislikedBy.push(CheckUser(req)); // Add username to list of dislikers
                        // Save blog data
                        comment.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'comment disliked!' }); // Return success message
                          }
                        });
                      } else {
                        comment.dislikes++; // Increase likes by one
                        comment.dislikedBy.push(CheckUser(req)); // Add username to list of likers
                        // Save blog data
                        comment.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'comment disliked!' }); // Return success message
                          }
                        });
                      }
                    }
                  }
                }
              });
          }
    }
      });






  router.get('/profile', (req, res) => {
    console.log("hello");

    console.log(req.userId);

    // Search for user in database
    // User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
    //   // Check if error connecting
    //   if (err) {
    //     res.json({ success: false, message: err }); // Return error
    //   } else {
    //     // Check if user was found in database
    //     if (!user) {
    //       res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
    //     } else {
    //       res.json( user ); // Return success, send user object to frontend for profile
    //     }
    //   }
    // });
  });

  router.get('/singleComment/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No comment ID was provided.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Comment.findOne({ _id: req.params.id }, (err, comment) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid comment id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!comment) {
            res.json({ success: false, message: 'comment not found.' }); // Return error message
           }
          //  else {
          //   // Find the current user that is logged in
          //   User.findOne({ _id: req.decoded.userId }, (err, user) => {
          //     // Check if error was found
          //     if (err) {
          //       res.json({ success: false, message: err }); // Return error
          //     } else {
          //       // Check if username was found in database
          //       if (!user) {
          //         res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
          //       } else {
          //         // Check if the user who requested single blog is the one who created it
          //         if (user.username !== blog.createdBy) {
          //           res.json({ success: false, message: 'You are not authorized to eidt this blog.' }); // Return authentication reror
          //         }
          else {
                    res.json({ success: true, comment: comment }); // Return success
                  }
          //       }
          //     }
          //   });
          // }
        }
      });
    }
  });



  router.delete('/deleteComment/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Comment.findOne({ _id: req.params.id }, (err, comment) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if blog was found in database
          if (!comment) {
            res.json({ success: false, messasge: 'comment was not found' }); // Return error message
          } else {
            // Get info on user who is attempting to delete post

              // Check if error was found

                    // Remove the blog from database
                    comment.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Comment deleted!' }); // Return success message
                      }
                    });
                  }




          }

      });
    }
  });



  router.put('/updateComment', (req, res) => {
    // Check if id was provided
  
    if (!req.body.id) {
      res.json({ success: false, message: 'No comment id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Comment.findOne({ _id: req.body.id }, (err, comment) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid comment id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!comment) {
            res.json({ success: false, message: 'comment id was not found.' }); // Return error message
          }
          else {
            if(CheckUser(req) != comment.createdBy){
              res.json({ success: false, message: 'You can only update youre own comments' });
            }
           // Save latest blog title
            comment.body = req.body.body; // Save latest body
            comment.save((err) => {
              if (err) {
                if (err.errors) {
                  res.json({ success: false, message: 'Please ensure form is filled out properly' });
                } else {
                  res.json({ success: false, message: err }); // Return error message
                }
              } else {
                res.json({ success: true, message: 'Comment Updated!' }); // Return success message
              }
            });
          }
    }
  });
} });



module.exports=router;
