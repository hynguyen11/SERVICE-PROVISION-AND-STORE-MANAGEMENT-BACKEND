const mongoose = require('mongoose');
// name, image, brand, price, category, countInStock, description
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},

		image: {
			type: String,
			required: true
		},

		brand: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},

		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Store'
		}
	},
	{
		timestamps: true
	}
);
productSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
