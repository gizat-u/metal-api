require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');

const UserRoute = require('./routes/user-route');
const ErrorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

// use
app.use(express.json());
app.use(CookieParser());
app.use(cors(
	// 	{
	// 	credentials: true,
	// 	origin: process.env.CLIENT_URL,
	// }
));

// need to turn off erros on production

// routes
app.use('/api', UserRoute);

// errors
app.use(ErrorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		app.listen(PORT, () => console.log(`[server] started on ${PORT}`));
	} catch (e) {
		console.log(e);
	}
}

start();