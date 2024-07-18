const UserRouter = require('./user');
const ProductRouter = require('./product');
const OrderRouter = require('./order');
const StoreRouter = require('./store');
const UploadRouter = require('./upload');
const PaymentRouter = require('./payment');

const routes = app => {
	app.use('/api/user', UserRouter);
	app.use('/api/product', ProductRouter);
	app.use('/api/order', OrderRouter);
	app.use('/api/store', StoreRouter);
	app.use('/api/upload', UploadRouter);
	app.use('/api/payment', PaymentRouter);
};

module.exports = routes;
