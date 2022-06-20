const TokenService = require('../services/token-service');
const ApiException = require('../exceptions/api-exception');

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiException.UnauthorizedError());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiException.UnauthorizedError());
		}

		const userData = TokenService.ValidateAccessToken(accessToken);
		if (!userData) {
			return next(ApiException.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiException.UnauthorizedError());
	}
}