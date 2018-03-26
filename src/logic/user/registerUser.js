const { User } = require('../../models/index');

const { validate, sha256, validatePassword } = require('../../utils/api-helpers');

module.exports = (username, password) => {
	return Promise.resolve()
		.then(() => {
			validate({ username, password });
			validatePassword(password);

			return User.findOne({ username });
		}).then((user) => {	
			if (user) throw Error('username already exists');

			const passwordHashed = sha256(password);
			return User.create({ username, password: passwordHashed });
		})
		.then(user => {
			if (!user) throw Error('user was not registered');

			return user._id;
		});
};
