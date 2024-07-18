const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
	{
		name: { type: String },
		phoneStore: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	},
	{ timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
