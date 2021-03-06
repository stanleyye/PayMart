var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
}, 
{	
	// additional options. 
	timestamps: true // adds a createdAt and updatedAt field
});

module.exports = mongoose.model('Customer', CustomerSchema);