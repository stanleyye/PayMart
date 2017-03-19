var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoreSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	products: {
		type: Array,
		default: []
	}
}, 
{	
	// additional options. 
	timestamps: true // adds a createdAt and updatedAt field
});

module.exports = mongoose.model('Store', StoreSchema);