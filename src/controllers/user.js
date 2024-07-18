const UserService = require('../services/user');

module.exports = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body;

			const response = await UserService.register(req.body);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res.status(200).json({
					status: 'ERR',
					message: 'Vui lòng nhập đầy đủ các trường'
				});
			}
			const response = await UserService.login(req.body);
			const { refreshToken, ...newResponse } = response;
			res.cookie('refresh_token', refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				path: '/'
			});
			return res.status(200).json({ ...newResponse, refreshToken });
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	logout: async (req, res) => {
		try {
			res.clearCookie('refresh_token');
			return res.status(200).json({
				status: 'OK',
				message: 'Logout successfully'
			});
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	newRefreshToken: async (req, res) => {
		try {
			const token = req.cookie.refresh_token;
			if (!token) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the token is required'
				});
			} else {
				const response = await UserService.getNewRefreshToken(token);
				return res.status(200).json(response);
			}
		} catch (error) {
			return res.status(404).json({ message: error });
		}
	},

	getDetailUser: async (req, res) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'The userId is required'
				});
			}
			const response = await UserService.getDetailUser(userId);
			return res.status(200).json(response);
		} catch (e) {
			return res.status(404).json({
				message: e
			});
		}
	},

	getAllUser: async (req, res) => {
		try {
			const response = await UserService.getAllUser();
			return res.status(200).json(response);
		} catch (e) {
			return res.status(404).json({
				message: e
			});
		}
	}
};
