const UserService = require('../services/user-service');

class UserController {

	async Signup(req, res, next) {
		try {
			const { name, email, phone, password } = req.body;
			const UserData = await UserService.Signup(name, email, phone, password);

			// httpOnly dont give access to change this param
			res.cookie('refreshToken', UserData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

			return res.json(UserData);
		} catch (e) {
			console.log(e);
		}
	}

	async Login(req, res, next) {
		try {

		} catch (e) {

		}
	}

	async Logout(req, res, next) {
		try {

		} catch (e) {

		}
	}

	async Activate(req, res, next) {
		try {

		} catch (e) {

		}
	}

	async Refresh(req, res, next) {
		try {

		} catch (e) {

		}
	}

	async GetAllUsers(req, res, next) {
		try {
			res.json(['123', '456']);
		} catch (e) {

		}
	}
}

module.exports = new UserController();