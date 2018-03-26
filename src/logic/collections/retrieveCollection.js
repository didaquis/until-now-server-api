const { Collection } = require('../../models/index');

module.exports = (id, id_user) => {
	return Promise.resolve()
		.then(() => {
			return Collection.findOne({ '_id': id, 'id_user': id_user }, { '__v': 0 });
		}).then(results => {
			if (!results) throw Error('collection does not exist');

			return results;
		});
};