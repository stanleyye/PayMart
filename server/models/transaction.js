var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  // TODO: Add products 
  store: {
  	type: Schema.Types.ObjectId,
  	required: true
  },
  payment: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, 
{	
	// additional options. 
	timestamps: true // adds a createdAt and updatedAt field
});

module.exports = mongoose.model('Transaction', TransactionSchema);