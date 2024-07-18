const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true
		},
		orderItems: [
			{
				name: { type: String, required: true },
				amount: { type: Number, required: true },
				price: { type: Number, required: true }
				// product: {
				// 	type: mongoose.Schema.Types.ObjectId,
				// 	ref: 'Product',
				// 	required: true
				// }
			}
		],
		itemPrice: { type: Number, required: true },
		discountPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true }
	},
	{
		timestamps: true
	}
);
orderSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

orderSchema.set('toJSON', {
	virtuals: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
