const { Collection } = require('../../models/collectionModel');

module.exports = () => {
	return Promise.resolve()
		.then(() => {
			return Collection.find({}, { '__v': 0 }).sort({ 'name': 1 });
		})
		.then(results => {
			if (!results) throw Error('no collections available');

			return results;
		});
};