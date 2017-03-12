var path = require('path');
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


router.get('/', function (req, res) {
    console.log("[INFO] Homepage");
 //    console.log(path.join(__dirname, '../', 'index.html'));
	// res.sendFile(path.join(__dirname, '../', 'index.html'));
    console.log(path.join(__dirname, './../../client', 'index.html'));
    res.sendFile(path.join(__dirname, './../../client', 'index.html'));
});

router.get('/register', function(req, res) {
	console.log("ree");
	res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
});

router.post('/register', function(req, res) {
	console.log("[INFO] Received post req for Register");
	console.log("[INFO]", "body:", req.body);
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
    	return res.render('register', { user : user });
    }

    console.log("Registered a User:", user);

    passport.authenticate('local')(req, res, function() {
    	console.log("[INFO] authentication with passport");
    	res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
	res.render('login', { user : req.user });
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
