var path = require('path');
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

// react router takes care of routing on the front end side
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../../client', 'index.html'));
});

router.post('/register', function(req, res, next) {
  console.log('registering user', req.body.first_name);
  console.log('password', req.body.password);

  User.register(new User({ 
      username : req.body.username, 
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }), req.body.password, function(err, user) {

      if (err) {
        console.log('error while user register!', err);
        return next(err);
      } 

      console.log("Registered a User:", user);

      passport.authenticate('local')(req, res, function() {
      	console.log("[INFO] authentication with passport");
      	res.redirect('/');
      });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
