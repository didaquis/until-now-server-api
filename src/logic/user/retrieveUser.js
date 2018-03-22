const { User } = require('../../models/userModel');

const { validate } = require('../../utils/api-helpers');

module.exports = (username, password) => {
	return Promise.resolve()
		.then(() => {
			validate({ username, password });

			return User.findOne({ 'username': username, 'password': password }, { password: 0, __v: 0 });
		})
		.then(user => {
			if (!user) throw Error('User does not exist');

			return user;
		});
};