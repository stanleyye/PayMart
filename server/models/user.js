var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// by default, passport-local-mongoose includes username + password
var User = new Schema({
		created_at: { 
			type: Date, 
			default: Date.now 
		},
		last_updated: {
			type: Date,
			default: Date.now
		},
		first_name: String,
		last_name: String,
    email: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);