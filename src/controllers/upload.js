const { getFileName, handleUpload } = require('../helpers/upload');

module.exports = {
	singleUpload: async (req, res) => {
		try {
			const path = await getFileName(req, res);
			const cldRes = await handleUpload(path);
			res.status(200).json({ url: cldRes });
		} catch (error) {
			res.status(500).json('Cannot upload image');
		}
	}
};
