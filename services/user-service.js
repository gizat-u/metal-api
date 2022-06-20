const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const UserDto = require('../dtos/user-dto');

const MailService = require('./mail-service');
const TokenService = require('./token-service');

const UserModel = require('../models/user-model');

const ApiException = require('../exceptions/api-exception');


class UserService {

	async Signup(name, email, phone, password) {

		const candidateEmail = await UserModel.findOne({ email });
		if (candidateEmail) {
			throw ApiException.BadRequest(`Пользователь с почтовым адрессом ${email} уже существует`);
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await UserModel.create({
			name,
			email,
			phone,
			password: hashPassword,
			image: 'https://api.multiavatar.com/Hester%20Vega.png',
			activationLink: activationLink
		});
		await MailService.SendActivationMail(email, `${process.env.API_URL}api/activate/${activationLink}`);

		// data transfer object, filter password from model
		const userDto = new UserDto(user); // id, email, isActivated
		const tokens = TokenService.GenerateTokens({ ...userDto });
		await TokenService.SaveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto
		}
	}

	async Activate(activationLink) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw ApiException.BadRequest(`Некорректная ссылка активации`);
		}
		user.isActivated = true;
		await user.save();
	}

	async Login(email, password) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ApiException.BadRequest(`Пользователь с таким ${email} не найден`);
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiException.BadRequest(`Неверный email или пароль`);
		}
		const userDto = new UserDto(user);
		const tokens = TokenService.GenerateTokens({ ...userDto });

		await TokenService.SaveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto
		}
	}

	async Logout(refreshToken) {
		const token = await TokenService.RemoveToken(refreshToken);
		return token;
	}
}

module.exports = new UserService();