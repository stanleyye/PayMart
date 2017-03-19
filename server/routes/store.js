var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Store = require('../models/store');
var config = require('../config');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	var currUser = req.user;

	if (!currUser) {
		res.json({
			success: false,
			message: 'Cannot verify user'
		});
	}

	if (!currUser.store) {
		res.json({
				success: false,
				message: 'Must create a store first'
			});
	} else {
		Store.findOne({
				_id: currUser.store
			}, function(err, store) {
				if (err) {
					console.log("[ERROR]", err);
					res.json({
						success: false,
						message: err
					});
				}
			
				res.json({
					success: true,
					store
				});
			});
	}
});

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	// if they are sending a POST request, then they should not have already have a store
	var currUser = req.user;

	// user has store already
	if (currUser.store) {
		res.json({
			success: false,
			message: 'You already have a store.'
		});
	} else {
		// need to put up on API docs 
		if (!req.body.name || !req.body.address || !req.body.country) {
			res.json({
				success: false,
				message: 'Your store is missing some details.'
			});
		}

		var newStore = new Store({
			name: req.body.name,
			address: req.body.address,
			country: req.body.country
		});

		newStore.save(function(err) {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to create a new store. Name is not unique.'
				});
			}

			// set a reference from the user to the store
			User.findOneAndUpdate(
				{ username: currUser.username }, 
				{ $set: { store: newStore._id }},
				{ new: true },
				function(err, user) {
					if (err) {
						console.log('[Error]', 'error saving store to user');
						res.json({
							success: true,
							message: 'Created a store with the name \"' + newStore.name + '\"'
						});
					}
					console.log('[INFO]', 'saving saving store to user');
					console.log('new user profile', user);
				}
			);

			res.json({
				success: true,
				message: 'Created a store with the name \"' + newStore.name + '\"'
			})
		});
	}
});

module.exports = router;