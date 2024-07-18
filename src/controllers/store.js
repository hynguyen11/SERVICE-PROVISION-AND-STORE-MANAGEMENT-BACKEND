const Store = require('../models/store');
const StoreService = require('../services/store');

module.exports = {
	createStore: async (req, res) => {
		try {
			const { name, phoneStore, user } = req.body;
			if (!name || !phoneStore || !user) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the input is required'
				});
			}
			const response = await StoreService.createStore(req.body);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	getAllStore: async (req, res) => {
		try {
			let allStores = [];
			allStores = await Store.find().sort({
				createdAt: -1,
				updatedAt: -1
			});
			return res.status(200).json({
				status: 'OK',
				message: 'Success',
				data: allStores
			});
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	getDetailStore: async (req, res) => {
		try {
			const storeId = req.params.id;
			if (!storeId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the storeId is required'
				});
			}
			const response = await StoreService.getDetailStore(storeId);

			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	getStoreProduct: async (req, res) => {
		try {
			const storeId = req.params.id;
			const search = req.query.search;
			if (!storeId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the storeId is required'
				});
			}
			const response = await StoreService.getProductStore(
				storeId,
				search
			);

			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},
	getAllTypeProductStore: async (req, res) => {
		try {
			const storeId = req.params.id;
			const response = await StoreService.getAllTypeProductStore(storeId);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	}
};
