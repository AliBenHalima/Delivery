// Blog Model Definition
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    // title: { type: String, required: false },
    body: { type: String, required: true},
    createdBy :{type: mongoose.Schema.Types.ObjectId,ref:'User', required: true }, // poster by which user
    createdAt: { type: Date, default: Date.now(), required: false },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array },
    // comments: [{
    //   comment: { type: String },
    //   commentator: { type: String },
    // }],
    PostedFor :{type: mongoose.Schema.Types.ObjectId,ref:'Product', required: true } // poster for which product
  });

  // Export Module/Schema
  module.exports = mongoose.model('Comment', CommentSchema);
