const Product = require('../models/product');

const createProduct = (newProduct, storeId) => {
	return new Promise(async (resolve, reject) => {
		const { name, image, brand, price, store } = newProduct;

		try {
			const checkProduct = await Product.findOne({ name: name });
			if (checkProduct !== null) {
				resolve({
					status: 'ERR',
					message: 'the name of product is already'
				});
			}
			const newPro = await Product.create({
				name,
				image,
				brand,
				price,
				store: storeId
			});

			if (newPro) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: newPro
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

const getProductList = (limit, page, sort, filter) => {
	return new Promise(async (resolve, reject) => {
		try {
			const totalProduct = await Product.estimatedDocumentCount();
			let allProduct = [];
			if (filter) {
				const label = filter[0];
				const allObjectFilter = await Product.find({
					[label]: { $regex: filter[1] }
				})
					.limit(limit)
					.skip(page * limit)
					.sort({ createdAt: -1, updatedAt: -1 });
				resolve({
					status: 'OK',
					message: 'Success',
					data: allObjectFilter,
					total: totalProduct,
					pageCurrent: Number(page + 1),
					totalPage: Math.ceil(totalProduct / limit)
				});
			}
			if (sort) {
				const objectSort = {};
				objectSort[sort[1]] = sort[0];
				const allProductSort = await Product.find()
					.limit(limit)
					.skip(page * limit)
					.sort(objectSort)
					.sort({ createdAt: -1, updatedAt: -1 });
				resolve({
					status: 'OK',
					message: 'Success',
					data: allProductSort,
					total: totalProduct,
					pageCurrent: Number(page + 1),
					totalPage: Math.ceil(totalProduct / limit)
				});
			}
			if (!limit) {
				allProduct = await Product.find().sort({
					createdAt: -1,
					updatedAt: -1
				});
			} else {
				allProduct = await Product.find()
					.limit(limit)
					.skip(page * limit)
					.sort({ createdAt: -1, updatedAt: -1 });
			}
			resolve({
				status: 'OK',
				message: 'Success',
				data: allProduct,
				total: totalProduct,
				pageCurrent: Number(page + 1),
				totalPage: Math.ceil(totalProduct / limit)
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getProductDetails = id => {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.findOne({ _id: id });
			if (product === null) {
				resolve({
					status: 'OK',
					message: 'the product is not defined'
				});
			}
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				data: product
			});
		} catch (error) {
			reject(error);
		}
	});
};

const updatedProduct = (id, data) => {
	new Promise(async (resolve, reject) => {
		try {
			const checkProduct = await Product.findOne({ _id: id });
			if (checkProduct === null) {
				resolve({
					status: 'OK',
					message: 'the product is not defined'
				});
			}
			const updated = await Product.findByIdAndUpdate(id, data, {
				new: true
			});
			if (updated) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: updated
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

const getAllType = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allType = await Product.distinct('brand');
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

const getAllCategory = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allType = await Product.distinct('category');
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

const deleteProduct = id => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkProduct = await Product.findOne({
				_id: id
			});
			if (checkProduct === null) {
				resolve({
					status: 'OK',
					message: 'the user is not defined'
				});
			}
			await Product.findByIdAndDelete(id);
			resolve({
				status: 'OK',
				message: 'Delete product success'
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	getProductList,
	createProduct,
	updatedProduct,
	getAllType,
	getProductDetails,
	getAllCategory,
	deleteProduct
};
