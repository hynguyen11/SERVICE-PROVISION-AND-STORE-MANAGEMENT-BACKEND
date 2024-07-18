const { singleUpload } = require('../controllers/upload');
const express = require('express');
const router = express.Router();

router.post('/single-upload', singleUpload);
module.exports = router;
