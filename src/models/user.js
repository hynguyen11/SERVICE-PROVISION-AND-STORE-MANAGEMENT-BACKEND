const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false, required: true }
	},
	{ timestamps: true }
);
userSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

userSchema.set('toJSON', {
	virtuals: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;
