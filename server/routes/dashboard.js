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

});

router.get('/dashboard/inventory', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/transactions', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/analytics', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/users', passport.authenticate('jwt', { session: false }), function(req, res) {

});

router.get('/dashboard/settings', passport.authenticate('jwt', { session: false }), function(req, res) {

});