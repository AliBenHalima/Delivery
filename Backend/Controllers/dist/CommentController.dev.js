"use strict";

var express = require("express");

var mongoose = require("mongoose");

var User = require('../Models/User');

var jwt = require('jsonwebtoken'); // const test =require('./test.json');


var router = express.Router(); // const FilmModel = mongoose.model("movies");

var Comment = require('../Models/Comment'); // const review = require('../Model/review');


var CheckUser = function CheckUser(req) {
  var token = req.headers.authtoken;
  var decodedToken = jwt.verify(token, "my-secret-token");
  return decodedToken.userId;
};

router.get("/list", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Comment.find(function (err, docs) {
            if (!err) {
              res.json({
                success: true,
                data: docs
              }); // Return error message
            } else {
              res.send("Error");
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); // router.get("/liste",async (req,res)=>{
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

router.get("/:id", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // console.log( req.userData.userId);
          // console.log( req.userData.userId);
          Comment.find({
            _id: req.params.id
          }, function (err, docs) {
            if (!err) {
              res.send({
                data: docs
              });
            } else {
              res.send("Product doesnt exist!? ");
            }
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/Reviews/:id", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          review.find({
            PostedFor: req.params.id
          }, function (err, docs) {
            if (!err) {
              res.send({
                data: docs
              });
            } else {
              res.send("Movie doesnt exist!? ");
            }
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get("/Reviews/Rating/:id", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          review.find({
            PostedFor: req.params.id
          }, function (err, docs) {
            if (!err) {
              res.send({
                data: docs
              });
            } else {
              res.send("Movie doesnt exist!? ");
            }
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post('/newComment', function (req, res) {
  // const token = req.headers.authtoken;
  // const decodedToken = jwt.verify(token, "my-secret-token");
  console.log(req.body); // Check if blog body was provided

  if (!req.body.body) {
    res.json({
      success: false,
      message: 'Comment is empty!'
    }); // Return error message
  } else {
    // Check if blog's creator was provided
    if (!CheckUser(req)) {
      res.json({
        success: false,
        message: 'You must Log in first!'
      }); // Return error
    } else {
      // Create the blog object for insertion into database
      var Comment_ = new Comment({
        body: req.body.body,
        // Body field
        createdBy: CheckUser(req),
        createdAt: req.body.createdAt,
        PostedFor: req.body.PostedFor // CreatedBy field // errror heere !!!!!!!!!!!

      }); // Save blog into database

      Comment_.save(function (err) {
        // Check if error
        if (err) {
          // Check if error is a validation error
          if (err.errors) {
            // Check if validation error is in the title field
            if (err.errors.body) {
              res.json({
                success: false,
                message: err.errors.body.message
              }); // Return error message
            } else {
              res.json({
                success: false,
                message: err
              }); // Return general error message
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
            message: 'Comment Added'
          }); // Return success message
        }
      });
    }
  }
});
router.get('/publicProfile', function (req, res) {
  // Check if username was passed in the parameters
  if (!req.params.username) {
    res.json({
      success: false,
      message: 'No username was provided'
    }); // Return error message
  } else {
    // Check the database for username
    User.findOne({
      username: req.params.username
    }).select('username email').exec(function (err, user) {
      // Check if error was found
      if (err) {
        res.json({
          success: false,
          message: 'Something went wrong.'
        }); // Return error message
      } else {
        // Check if user was found in the database
        if (!user) {
          res.json({
            success: false,
            message: 'Username not found.'
          }); // Return error message
        } else {
          console.log(user.username);
          res.json(user.username); // Return the public user's profile data
        }
      }
    });
  }
});
router.put('/likeComment', function (req, res) {
  console.log(req.body); // Check if id was passed provided in request body

  if (!req.body.id) {
    res.json({
      success: false,
      message: 'No id was provided.'
    }); // Return error message
  } else {
    if (!CheckUser(req)) {
      res.json({
        success: false,
        message: 'User not Logged in'
      }); // Return error message
    } else {
      // Search the database with id
      Comment.findOne({
        _id: req.body.id
      }, function (err, comment) {
        // Check if error was encountered
        if (err) {
          res.json({
            success: false,
            message: 'Invalid Comment id'
          }); // Return error message
        } else {
          // Check if id matched the id of a blog post in the database
          if (!comment) {
            res.json({
              success: false,
              message: 'That Comment was not found.'
            }); // Return error message
          } else {
            // Check if the user who liked the post has already liked the blog post before
            if (comment.likedBy.includes(CheckUser(req))) {
              comment.likes--;
              var arrayIndex = comment.likedBy.indexOf(CheckUser(req)); // Get the index of the username in the array for removal

              comment.likedBy.splice(arrayIndex, 1); // Remove user from array
              // Increment likes

              res.json({
                success: false,
                message: 'You already liked this post.'
              }); // Return error message
            } else {
              // Check if user who liked post has previously disliked a post
              if (comment.dislikedBy.includes(CheckUser(req))) {
                comment.dislikes--; // Reduce the total number of dislikes

                var _arrayIndex = comment.dislikedBy.indexOf(CheckUser(req)); // Get the index of the username in the array for removal


                comment.dislikedBy.splice(_arrayIndex, 1); // Remove user from array

                comment.likes++; // Increment likes

                comment.likedBy.push(CheckUser(req)); // Add username to the array of likedBy array
                // Save blog post data

                comment.save(function (err) {
                  // Check if error was found
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong.'
                    }); // Return error message
                  } else {
                    res.json({
                      success: true,
                      message: 'Comment liked!'
                    }); // Return success message
                  }
                });
              } else {
                comment.likes++; // Incriment likes

                comment.likedBy.push(CheckUser(req)); // Add liker's username into array of likedBy
                // Save blog post

                comment.save(function (err) {
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong.'
                    }); // Return error message
                  } else {
                    res.json({
                      success: true,
                      message: 'Comment liked!'
                    }); // Return success message
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
router.put('/dislikeComment', function (req, res) {
  // console.log(req.body.username);
  // Check if id was provided inside the request body
  console.log(req.body);

  if (!req.body.id) {
    res.json({
      success: false,
      message: 'No id was provided.'
    }); // Return error message
  } else {
    if (!CheckUser(req)) {
      res.json({
        success: false,
        message: 'User not Logged in !'
      }); // Return error message
    } else {
      // Search database for blog post using the id
      Comment.findOne({
        _id: req.body.id
      }, function (err, comment) {
        // Check if error was found
        if (err) {
          res.json({
            success: false,
            message: 'Invalid comment id'
          }); // Return error message
        } else {
          // Check if blog post with the id was found in the database
          if (!comment) {
            res.json({
              success: false,
              message: 'That blog was not found.'
            }); // Return error message
          } else {
            // Get data of user who is logged in
            // Check if user who disliked post has already disliked it before
            if (comment.dislikedBy.includes(CheckUser(req))) {
              res.json({
                success: false,
                message: 'You already disliked this post.'
              }); // Return error message
            } else {
              // Check if user has previous disliked this post
              if (comment.likedBy.includes(CheckUser(req))) {
                comment.likes--; // Decrease likes by one

                var arrayIndex = comment.likedBy.indexOf(CheckUser(req)); // Check where username is inside of the array

                comment.likedBy.splice(arrayIndex, 1); // Remove username from index

                comment.dislikes++; // Increase dislikeds by one

                comment.dislikedBy.push(CheckUser(req)); // Add username to list of dislikers
                // Save blog data

                comment.save(function (err) {
                  // Check if error was found
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong.'
                    }); // Return error message
                  } else {
                    res.json({
                      success: true,
                      message: 'comment disliked!'
                    }); // Return success message
                  }
                });
              } else {
                comment.dislikes++; // Increase likes by one

                comment.dislikedBy.push(CheckUser(req)); // Add username to list of likers
                // Save blog data

                comment.save(function (err) {
                  // Check if error was found
                  if (err) {
                    res.json({
                      success: false,
                      message: 'Something went wrong.'
                    }); // Return error message
                  } else {
                    res.json({
                      success: true,
                      message: 'comment disliked!'
                    }); // Return success message
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
router.get('/profile', function (req, res) {
  console.log("hello");
  console.log(req.userId); // Search for user in database
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
router.get('/singleComment/:id', function (req, res) {
  // Check if id is present in parameters
  if (!req.params.id) {
    res.json({
      success: false,
      message: 'No comment ID was provided.'
    }); // Return error message
  } else {
    // Check if the blog id is found in database
    Comment.findOne({
      _id: req.params.id
    }, function (err, comment) {
      // Check if the id is a valid ID
      if (err) {
        res.json({
          success: false,
          message: 'Not a valid comment id'
        }); // Return error message
      } else {
        // Check if blog was found by id
        if (!comment) {
          res.json({
            success: false,
            message: 'comment not found.'
          }); // Return error message
        } //  else {
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
            res.json({
              success: true,
              comment: comment
            }); // Return success
          } //       }
        //     }
        //   });
        // }

      }
    });
  }
});
router["delete"]('/deleteComment/:id', function (req, res) {
  // Check if ID was provided in parameters
  if (!req.params.id) {
    res.json({
      success: false,
      message: 'No id provided'
    }); // Return error message
  } else {
    // Check if id is found in database
    Comment.findOne({
      _id: req.params.id
    }, function (err, comment) {
      // Check if error was found
      if (err) {
        res.json({
          success: false,
          message: 'Invalid id'
        }); // Return error message
      } else {
        // Check if blog was found in database
        if (!comment) {
          res.json({
            success: false,
            messasge: 'comment was not found'
          }); // Return error message
        } else {
          // Get info on user who is attempting to delete post
          // Check if error was found
          // Remove the blog from database
          comment.remove(function (err) {
            if (err) {
              res.json({
                success: false,
                message: err
              }); // Return error message
            } else {
              res.json({
                success: true,
                message: 'Comment deleted!'
              }); // Return success message
            }
          });
        }
      }
    });
  }
});
router.put('/updateComment', function (req, res) {
  // Check if id was provided
  if (!req.body.id) {
    res.json({
      success: false,
      message: 'No comment id provided'
    }); // Return error message
  } else {
    // Check if id exists in database
    Comment.findOne({
      _id: req.body.id
    }, function (err, comment) {
      // Check if id is a valid ID
      if (err) {
        res.json({
          success: false,
          message: 'Not a valid comment id'
        }); // Return error message
      } else {
        // Check if id was found in the database
        if (!comment) {
          res.json({
            success: false,
            message: 'comment id was not found.'
          }); // Return error message
        } else {
          if (CheckUser(req) != comment.createdBy) {
            res.json({
              success: false,
              message: 'You can only update youre own comments'
            });
          } // Save latest blog title


          comment.body = req.body.body; // Save latest body

          comment.save(function (err) {
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
                message: 'Comment Updated!'
              }); // Return success message
            }
          });
        }
      }
    });
  }
});
module.exports = router;