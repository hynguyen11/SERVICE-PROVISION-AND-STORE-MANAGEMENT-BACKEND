const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router.post('/create-product', ProductController.createProduct);
router.get('/get-all-product', ProductController.getProductList);
router.get('/get-store-product/:storeType', ProductController.getProductStore);
router.get('/get-details-product/:id', ProductController.getDetailProduct);
router.get('/get-all-type', ProductController.getAllType);
router.get('/get-all-category', ProductController.getAllCategory);
router.put('/update-product/:id', ProductController.updatedProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);
module.exports = router;
