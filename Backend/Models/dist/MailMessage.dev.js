"use strict";

var mongoose = require('mongoose');

var MailMessageSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('MailMessage', MailMessageSchema);