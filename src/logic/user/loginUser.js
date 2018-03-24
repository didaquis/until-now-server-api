const { User } = require('../../models/userModel');

const { validate, sha256 } = require('../../utils/api-helpers');

module.exports = (username, password) => {
	return Promise.resolve()
		.then(() => {
			validate({ username, password });

			const passwordHashed = sha256(password);
			return User.findOne({ username, password:passwordHashed }, { 'password': 0, '__v': 0 });
		})
		.then(user => {
			if (!user) throw Error('wrong username and/or password');

			return user;
		});
};