var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Store = require('../models/store');
var config = require('../config');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  // console.log("req", req);
  res.json({
    success: true,
    message: 'Accessing the dashboard.'
  });
});

router.get('/store', passport.authenticate('jwt', { session: false }), function(req, res) {
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
					store: {
						'name': store.name
					}
				});
			});
	}


});

router.post('/store', passport.authenticate('jwt', { session: false}), function(req, res) {
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
		if (!req.body.name) {
			res.json({
				success: false,
				message: 'Your store is missing a name.'
			});
		}

		var newStore = new Store({
			name: req.body.name
		});

		newStore.save(function(err) {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to create a new store. Name is not unique.'
				});
			}

			// set a reference from the user to the store
			currUser.store = newStore._id;
			console.log('[Current User]', currUser);

			User.update({
				store: newStore._id
			}, function(err) {
				console.log('[Error]', 'error saving store to user');
			});

			res.json({
				success: true,
				message: 'Created a store with the name \"' + newStore.name + '\"'
			})
		});
	}
});

router.get('/inventory', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({
    success: true,
    message: 'Accessing the inventory dashboard.'
  });
});

router.get('/transactions', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({
    success: true,
    message: 'Accessing transaction dashboard.'
  });
});

router.get('/analytics', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({
    success: true,
    message: 'Accessing dashboard analytics.'
  });
});

router.get('/settings', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({
    success: true,
    message: 'Accessing settings in the dashboard.'
  });
});

module.exports = router;