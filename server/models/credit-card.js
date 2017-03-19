var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

// TODO: encrypt the card number
var CreditCardSchema = new Schema({
	card_number: {
		type: String,
		required: true
	}, 
	card_type: {
		type: String,
		required: true
	},
	customer: {
		type: Schema.Types.ObjectId,
		required: true
	}
}, 
{	
	// additional options. 
	timestamps: true // adds a createdAt and updatedAt field
});

module.exports = mongoose.model('CreditCard', CreditCardSchema);