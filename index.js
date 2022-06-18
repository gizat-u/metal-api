require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');

const UserRoute = require('./routes/user-route');

const PORT = process.env.PORT || 5000;
const app = express();

// use
app.use(express.json());
app.use(CookieParser());
app.use(cors());

// need to turn off erros on production

// routes
app.use('/api', UserRoute);

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