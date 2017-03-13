var passport = require("passport");  
var passportJWT = require("passport-jwt");  

// use mongoDB here
//var users = require("./users.js");  

var cfg = require("./../config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var jwtStrategy = passportJWT.Strategy;  

var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
    passport.use(new jwtStrategy(params, function(payload, done) {

        // search through mongoDB instead here
        // var user = users[payload.id] || null;
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
    
    // return {
    //     initialize: function() {
    //         return passport.initialize();
    //     },
    //     authenticate: function() {
    //         return passport.authenticate("jwt", cfg.jwtSession);
    //     }
    // };
};