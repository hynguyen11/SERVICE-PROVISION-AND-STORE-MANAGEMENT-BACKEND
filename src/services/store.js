const Product = require('../models/product');
const Store = require('../models/store');

const createStore = newStore => {
	return new Promise(async (resolve, reject) => {
		const { name, address, phoneStore, user } = newStore;
		try {
			const store = await Store.create({
				name,
				address,
				phoneStore,
				user
			});
			if (store) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: store
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

const getDetailStore = id => {
	return new Promise(async (resolve, reject) => {
		try {
			const store = await Store.findOne({ _id: id }).populate('user');
			if (store === null) {
				resolve({
					status: 'ERR',
					message: 'the store is not defined'
				});
			}
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: store
			});
		} catch (error) {
			reject(error);
		}
	});
};

const getProductStore = (id, search) => {
	return new Promise(async (resolve, reject) => {
		try {
			let query = { store: id };
			if (search) {
				query.name = { $regex: search, $options: 'i' };
			}
			const store = await Product.find(query).populate('store');
			if (store === null) {
				resolve({
					status: 'ERR',
					message: 'the store is not defined'
				});
			}
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: store
			});
		} catch (error) {
			reject(error);
		}
	});
};

const getAllTypeProductStore = async storeId => {
	return new Promise(async (resolve, reject) => {
		try {
			const allType = await Product.distinct('brand', { store: storeId });
			resolve({
				status: 'OK',
				message: 'success',
				data: allType
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	createStore,
	getDetailStore,
	getProductStore,
	getAllTypeProductStore
};
