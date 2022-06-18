const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const UserDto = require('../dtos/user-dto');

const MailService = require('./mail-service');
const TokenService = require('./token-service');

const UserModel = require('../models/user-model');


class UserService {

	async Signup(name, email, phone, password) {

		const candidateEmail = await UserModel.findOne({ email });
		if (candidateEmail) {
			throw new Error(`Пользователь с почтовым адрессом ${email} уже существует`);
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
		await MailService.SendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		// data transfer object, filter password from model
		const userDto = new UserDto(user); // id, email, isActivated
		const tokens = TokenService.GenerateTokens({ ...userDto });
		await TokenService.SaveToken(userDto.id, tokens.RefreshToken);

		return {
			...tokens,
			user: userDto
		}
	}
}

module.exports = new UserService();