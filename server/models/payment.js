var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  transaction_amount: {
    type: Number,
    required: true
  }, 
  credit_card: {
    type: Schema.Types.ObjectId
  }
}, 
{	
	// additional options. 
	timestamps: true // adds a createdAt and updatedAt field
});

module.exports = mongoose.model('Payment', PaymentSchema);