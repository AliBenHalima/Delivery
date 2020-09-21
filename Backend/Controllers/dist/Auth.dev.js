"use strict";

var jwt = require('jsonwebtoken');

module.exports.Auth = function (req, res, next) {
  var jwt = require('jsonwebtoken');

  try {
    var token = req.headers.authtoken;
    var decodedToken = jwt.verify(token, "my-secret-token");
    req.userData = {
      userId: decodedToken.userId
    };
    next();
  } catch (err) {
    res.json({
      isAuth: false
    });
  }
};

var AccessControl = require('role-acl');

var ac = new AccessControl();
ac.grant('User').execute('read').on('Product').execute('create').on('Product').execute('delete').on('Product').execute('update').on('Product').execute('manage').on('Product').execute('create').on('Reservation').execute('update').on('Reservation').execute('create').on('User').execute('update').on('User') //admin
.grant('Admin').extend('User').execute('read').on('Reservation').execute('delete').on('Reservation').execute('delete').on('User');

module.exports.isAuth4Product = function (req, res, next) {
  var token = req.headers.authtoken;
  var decodedToken = jwt.verify(token, "my-secret-token");
  req.userData = {
    userId: decodedToken.userId,
    role: decodedToken.role
  };
  var Role = req.userData.role;
  var permission = ac.can(Role).execute('manage').sync().on('Product');

  if (permission.granted) {
    next();
    console.log("yyy");
  } else res.json({
    Error: "You're not allowed to execute Product operations"
  });
};

module.exports.isAuth4Reservation = function (req, res, next) {
  var token = req.headers.authtoken;
  var decodedToken = jwt.verify(token, "my-secret-token");
  req.userData = {
    userId: decodedToken.userId,
    role: decodedToken.role
  };
  var Role = req.userData.role;
  var permission = ac.can(Role).execute('read').execute('delete').sync().on('Reservation');

  if (permission.granted) {
    next();
    console.log("yyy");
  } else res.json({
    Error: "You're not allowed to execute Reservation operations "
  });
};

module.exports.isAuth4User = function (req, res, next) {
  var token = req.headers.authtoken;
  var decodedToken = jwt.verify(token, "my-secret-token");
  req.userData = {
    userId: decodedToken.userId,
    role: decodedToken.role
  };
  var Role = req.userData.role;
  var permission = ac.can(Role).execute('delete').sync().on('User');

  if (permission.granted) {
    next();
    console.log("yyy");
  } else res.json({
    Error: "You're not allowed to execute Users operations"
  });
};