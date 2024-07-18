const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authUserMiddleWare } = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.post('/get-new-token', userController.newRefreshToken);
router.get(
	'/get-detail-user/:id',
	authUserMiddleWare,
	userController.getDetailUser
);

router.get('/get-all-user', userController.getAllUser);

module.exports = router;
