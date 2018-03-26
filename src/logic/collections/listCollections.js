const { Collection } = require('../../models/index');

module.exports = (id_user) => {
	return Promise.resolve()
		.then(() => {
			return Collection.find({'id_user': id_user}, { '__v': 0 }).sort({ 'name': 1 });
		})
		.then(results => {
			if (!results) throw Error('no collections available');

			return results;
		});
};