var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var config = require('../config');
var jwt = require('jsonwebtoken');

router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({
    success: true,
    message: 'Accessing the dashboard.'
  });
});

router.get('/dashboard/store', passport.authenticate('jwt', { session: false }), function(req, res) {
	var currAccUsername = this.req.username;
	console.log("username", currAccUsername);
	User.findOne({
		username: currAccUsername
	}, function(err, user) {
		if (err) {
			throw err;
		}

		if (!user.store) {
			res.json({
				success: false,
				message: 'Must create a store first'
			});
		} else {
			// TODO: Send details of store over API call
			res.json({
				success: true,
				store: {
					'name': ''
				}
			});
		}
	});
});

router.get('/dashboard/inventory', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/transactions', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/analytics', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/settings', passport.authenticate('jwt', { session: false }), function(req, res) {

});