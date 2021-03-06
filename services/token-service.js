const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {

	GenerateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
		return {
			accessToken,
			refreshToken
		}
	}

	async SaveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await TokenModel.create({ user: userId, refreshToken });
		return token;
	}

	async RemoveToken(refreshToken) {
		const tokenData = await TokenModel.deleteOne({ refreshToken });
		return tokenData;
	}

	ValidateAccessToken(acessToken) {
		try {
			const userData = jwt.verify(acessToken, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	ValidateRefreshToken(refreshToken) {
		try {
			const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async FindToken(refreshToken) {
		const tokenData = await TokenModel.findOne({ refreshToken });
		return tokenData;
	}
}

module.exports = new TokenService();