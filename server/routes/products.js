var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Store = require('../models/store');
var Product = require('../models/product');
var config = require('../config');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({
    success: true,
    message: 'Accessing the products dashboard.'
  });
});

// POST requests should not be for existing products, only NEW products. 
// Use PUT for existing products
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	var storeId = req.user.store;
	if (!storeId) {
		res.json({
			success: false,
			message: 'The store is not available.'
		});
	}

	if (!req.body.name || !req.body.price || !req.body.amount || req.body.price < 0 
			|| req.body.amount < 0) {
		res.json({
			success: false,
			message: 'One or more product fields are missing or invalid.'
		});
	}

	// TODO: put var on top later due to JS hoisting and add in other product details later
	var newProduct = new Product({
		name: req.body.name,
		price: req.body.price,
		amount: req.body.amount
	});

	newProduct.save(function(err) {
		if (err) {
			console.log("[Error]", err);
			res.json({
				success: false,
				message: err
			});
		}


		// doing this will not allow schema pre functions
		Store.findByIdAndUpdate(
			storeId,
			// TODO: add product here 
			{$push: {products: newProduct}},
			{safe: true, upsert: true},
			function(err, model) {
				if (err) {
					console.log('[Error]', err);
					res.json({
						success: false,
						error: err
					});
				}

				console.log('Success updated store with product');
				res.json({
					success: true,
					message: 'Product ' + newProduct.name + ' has been successfully added to the store'
				})
			}
		);
	});
});


module.exports = router;