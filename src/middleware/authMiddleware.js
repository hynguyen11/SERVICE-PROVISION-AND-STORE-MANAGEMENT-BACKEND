const jwt = require('jsonwebtoken');
const authUserMiddleWare = (req, res, next) => {
	const token = req.headers.token.split(' ')[1];
	const userId = req.params.id;
	jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(404).json({
				message: 'The authentication',
				status: 'ERROR'
			});
		}
		if (user?.isAdmin || user?.userId === userId) {
			next();
		} else {
			return res.status(404).json({
				message: 'The authentication',
				status: 'ERROR'
			});
		}
	});
};

const authMiddleWare = (req, res, next) => {
	const token = req.headers.token.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(404).json({
				message: 'The authemtication',
				status: 'ERROR'
			});
		}
		if (user?.isAdmin) {
			next();
		} else {
			return res.status(404).json({
				message: 'The authemtication',
				status: 'ERROR'
			});
		}
	});
};
module.exports = {
	authUserMiddleWare,
	authMiddleWare
};
