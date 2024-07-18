const express = require('express');
const routes = require('./src/routes/index');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

dotenv.config();
console.log(process.env.PORT);
const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
routes(app);

mongoose
	.connect(`${process.env.DATABASE_URL}`)
	.then(() => {
		console.log('connect to database successfully');
	})
	.catch(err => {
		console.log('error: ', err);
	});

app.listen(port, () => console.log(`server running at port: ${port}`));
