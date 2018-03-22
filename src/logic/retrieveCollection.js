const { Collection } = require('../models/collectionModel');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Collection.findOne({ '_id': id }, { '__v': 0 });
		}).then(results => {
			if (!results) throw Error('Collection does not exist');

			return results;
		});
};