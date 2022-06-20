const UserService = require('../services/user-service');
const ApiException = require('../exceptions/api-exception');
const { validationResult } = require('express-validator');

class UserController {

	async Signup(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiException.BadRequest('Ошибка при валидации', errors.array()));
			}
			const { name, email, phone, password } = req.body;
			const userData = await UserService.Signup(name, email, phone, password);

			// httpOnly dont give access to change this param
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async Login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await UserService.Login(email, password);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async Logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await UserService.Logout(refreshToken);

			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async Activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await UserService.Activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async Refresh(req, res, next) {
		try {

		} catch (e) {
			next(e);
		}
	}

	async GetAllUsers(req, res, next) {
		try {
			res.json(['123', '456']);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();