const express = require('express');
const router = express.Router();
const Payment = require('../controllers/payment');
const { formatDate } = require('../helpers/formatDate');
router.post('/create-payment', Payment.createPayment);
router.post('/create_payment_url', function (req, res, next) {
	var ipAddr =
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;

	// var dateFormat = require('dateformat');

	var tmnCode = 'CWFHBJ17';
	var secretKey = 'WXJCTMAOLASKMSFPHEEBUIXARVIZQTGJ';
	var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
	var returnUrl = 'http://localhost:5173/cashier';

	var date = new Date();

	var createDate = formatDate(date);
	// var orderId = dateFormat(date, 'HHmmss');
	var amount = req.body.amount;
	var bankCode = req.body.bankCode;

	var orderInfo = 'Thanh toán!';
	var orderType = 'other';
	var locale = req.body.language;
	if (locale === null || locale === '') {
		locale = 'vn';
	}
	var currCode = 'VND';
	var vnp_Params = {};
	vnp_Params['vnp_Version'] = '2.1.0';
	vnp_Params['vnp_Command'] = 'pay';
	vnp_Params['vnp_TmnCode'] = tmnCode;
	// vnp_Params['vnp_Merchant'] = ''
	vnp_Params['vnp_Locale'] = locale;
	vnp_Params['vnp_CurrCode'] = currCode;
	vnp_Params['vnp_TxnRef'] = 11;
	vnp_Params['vnp_OrderInfo'] = orderInfo;
	vnp_Params['vnp_OrderType'] = orderType;
	vnp_Params['vnp_Amount'] = amount * 100;
	vnp_Params['vnp_ReturnUrl'] = returnUrl;
	vnp_Params['vnp_IpAddr'] = ipAddr;
	vnp_Params['vnp_CreateDate'] = createDate;
	if (bankCode !== null && bankCode !== '') {
		vnp_Params['vnp_BankCode'] = bankCode;
	}

	vnp_Params = sortObject(vnp_Params);

	var querystring = require('qs');
	var signData = querystring.stringify(vnp_Params, { encode: false });
	var crypto = require('crypto');
	var hmac = crypto.createHmac('sha512', secretKey);
	var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
	vnp_Params['vnp_SecureHash'] = signed;
	vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

	res.status(200).json(vnpUrl);
	// res.redirect(vnpUrl);
});
function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key));
		}
	}
	str.sort();
	for (key = 0; key < str.length; key++) {
		sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
			/%20/g,
			'+'
		);
	}
	return sorted;
}
module.exports = router;
