const express = require('express');
const router = express.Router();

const StoreController = require('../controllers/store');

router.post('/create-store', StoreController.createStore);
router.get('/get-all-store', StoreController.getAllStore);
router.get('/get-detail-store/:id', StoreController.getDetailStore);
router.get('/get-products-store/:id/products', StoreController.getStoreProduct);
router.get(
	'/get-all-type/:id/allTypeProduct',
	StoreController.getAllTypeProductStore
);

module.exports = router;
