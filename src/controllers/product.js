const ProductService = require('../services/product');
const Product = require('../models/product');
const unidecode = require('unidecode');

module.exports = {
	createProduct: async (req, res) => {
		try {
			const { name, image, brand, price, store } = req.body;

			if (!name || !image || !brand || !price || !store) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the input is required'
				});
			}
			const response = await ProductService.createProduct(
				req.body,
				store
			);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},
	getProductList: async (req, res) => {
		try {
			const { limit, page, sort, filter } = req.query;
			const response = await ProductService.getProductList(
				Number(limit) || null,
				Number(page) || 0,
				sort,
				filter
			);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	getProductStore: async (req, res) => {
		const storeType = req.params.storeType;
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort == 'desc' ? -1 : 1;
		let query = { storeType };
		let search = req.query.search;
		if (search) {
			query.name = { $regex: search, $options: 'i' };
		}
		Product.find(query)
			.limit(limit)
			.sort({ id: sort })
			.then(products => {
				res.json({
					status: 'OK',
					message: 'Success',
					data: products
				});
			})
			.catch(err => console.log(err));
	},
	updatedProduct: async (req, res) => {
		try {
			const productId = req.params.id;
			const data = req.body;
			if (!productId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the productId is required'
				});
			}
			const response = await ProductService.updatedProduct(
				productId,
				data
			);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	deleteProduct: async (req, res) => {
		try {
			const productId = req.params.id;

			if (!productId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the productId is required'
				});
			}
			const response = await ProductService.deleteProduct(productId);
			return res.status(200).json(response);
		} catch (e) {
			return res.status(404).json({
				message: e
			});
		}
	},

	getAllType: async (req, res) => {
		try {
			const response = await ProductService.getAllType();
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	getAllCategory: async (req, res) => {
		try {
			const response = await ProductService.getAllCategory();
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	getDetailProduct: async (req, res) => {
		try {
			const productId = req.params.id;
			if (!productId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the userID is required'
				});
			}
			const response = await ProductService.getProductDetails(productId);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	}
};
