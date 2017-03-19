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

module.exports = router;