var passport = require("passport");  
var passportJWT = require("passport-jwt");  

var config = require("./../config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var jwtStrategy = passportJWT.Strategy;  

var opt = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
  passport.use(new jwtStrategy(opt, function(payload, done) {
    User.findOne({
        username: payload.username
    }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(new Error("User not found"), null);
        }
    });
  }));
};