const ApiException = require('../exceptions/api-exception');

module.exports = function (err, req, res, next) {
	console.log(err);
	if (err instanceof ApiException) {
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: `Ошибка сервера`, errors: err.errors });
};