var path = require('path');
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/login', function(req, res) {
  // TODO: update the last logged in field on every login
	User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, samePassword) {
        if (samePassword && !err) {

          var token = jwt.sign({
            // payload
            username: user.username
          }, config.jwtSecret, {
            // expires in 48 hours
            expiresIn: 172800 
          });

          res.json({ 
            success: true, 
            token: 'JWT ' + token 
          });
        } else {
          res.status(401).send({ 
            success: false, 
            message: 'Authentication failed. Passwords did not match.' 
          });
        }
      });
    }
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/register', function(req, res) {
  if(!req.body.username || !req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name) {
    res.json({ 
      success: false, 
      message: 'Authentication failed. One or more fields are missing.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    });

    // Attempt to save the user
    newUser.save(function(err) {
      console.log(err);
      if (err) {
        return res.json({ 
          success: false, 
          message: 'Authentication failed. The username or email is not unique.'
        });
      }
      res.status(201).json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

module.exports = router;
