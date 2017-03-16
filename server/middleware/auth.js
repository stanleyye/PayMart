var passport = require("passport");  
var passportJWT = require("passport-jwt");  

var User = require('../models/user');

var config = require("./../config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var jwtStrategy = passportJWT.Strategy;  

var opt = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
  passport.use(new jwtStrategy(opt, function(payload, done) {
    console.log("payload username", payload.username);
    User.findOne({
        username: payload.username
    }, function(err, user) {
        console.log("error finding the user", err);
        console.log("user", user);
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // return done(new Error("User not found"), null);
        }
    });
  }));
};