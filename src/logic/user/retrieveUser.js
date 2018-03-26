const { User } = require('../../models/index');

const { validate } = require('../../utils/api-helpers');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			validate({ id });

			return User.findOne({ '_id': id }, { 'password': 0, '__v': 0 });
		})
		.then(user => {
			if (!user) throw Error('user does not exist');

			return user;
		});
};