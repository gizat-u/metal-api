const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {

	GenerateTokens(payload) {
		const AccessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
		const RefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
		return {
			AccessToken,
			RefreshToken
		}
	}

	async SaveToken(userId, refreshToken) {
		const TokenData = await TokenModel.findOne({ user: userId });
		if (TokenData) {
			TokenData.refreshToken = refreshToken;
			return TokenData.save();
		}
		const token = await TokenModel.create({ user: userId, refreshToken });
		return token;
	}
}

module.exports = new TokenService();