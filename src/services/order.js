const Order = require('../models/order');

const createOrder = newOrder => {
	return new Promise(async (resolve, reject) => {
		const { orderItems, itemPrice, discountPrice, totalPrice, userId } =
			newOrder;

		try {
			const createOrder = await Order.create({
				orderItems,
				itemPrice,
				discountPrice,
				totalPrice,
				userId
			});
			if (createOrder) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: createOrder
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

const getAllOrder = userId => {
	return new Promise(async (resolve, reject) => {
		try {
			const allOrder = await Order.find({ userId: userId });

			resolve({
				status: 'OK',
				message: 'success',
				data: allOrder
			});
		} catch (e) {
			reject(e);
		}
	});
};

const findOrderById = search => {
	return new Promise(async (resolve, reject) => {
		try {
			const allOrder = await Order.find({
				_id: { $regex: search, $options: 'i' }
			});
			resolve({
				status: 'OK',
				message: 'success',
				data: allOrder
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createOrder,
	getAllOrder,
	findOrderById
};
