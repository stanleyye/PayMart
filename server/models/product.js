var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	}, 
	price: {
		type: Number,
		required: true,
		min: 0
	},
	amount: {
		type: Number,
		required: true,
		min: 0
	}, 
	description: {
		type: String
	},
	manufacturer: {
		type: String
	},
	picture: {
		type: String
	},
	product_category: {
		type: Schema.Types.ObjectId
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
	}
}, 
{	
	// additional options. 
	timestamps: true // adds a createdAt and updatedAt field
});

module.exports = mongoose.model('Product', ProductSchema);