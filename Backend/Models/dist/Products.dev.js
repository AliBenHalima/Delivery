"use strict";

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  CookingTime: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  Promotion: {
    type: Boolean,
    required: false
  },
  likes: {
    type: Number,
    "default": 0
  },
  likedBy: {
    type: Array
  },
  file: {
    type: String,
    required: false
  }
});
module.exports = mongoose.model('Product', ProductSchema);