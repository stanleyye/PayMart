var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Store = require('../models/store');
var Transaction = require('../models/transaction');
var config = require('../config');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.json({
    success: true,
    message: 'Accessing transaction dashboard.'
  });
});

// does not need to be authenticated, anybody should be able to make a transaction
router.post('/', function(req, res) {
	// if (!req.body.product_checkout || !req.body.payment || !req.)
});

module.exports = router;