module.exports = class UserDto {
	id;
	name;
	email;
	phone;
	role;
	image;
	balance;
	isActivated;

	constructor(model) {
		this.id = model._id;
		this.name = model.name;
		this.email = model.email;
		this.phone = model.phone;
		this.role = model.role;
		this.image = model.image;
		this.balance = model.balance;
		this.isActivated = model.isActivated;
	}
}