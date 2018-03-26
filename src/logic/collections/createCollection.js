const { Collection } = require('../../models/index');

const { validate } = require('../../utils/api-helpers');

module.exports = (name, id_user) => {
	return Promise.resolve()
		.then(() => {
			validate({ name, id_user });

			name = name.trim();
			id_user = id_user.trim();

			return Collection.create({ name, id_user });
		}).then(res => {
			return res._id;
		});
};