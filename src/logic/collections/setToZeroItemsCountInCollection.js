const { Collection } = require('../../models/collectionModel');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Collection.findByIdAndUpdate({ '_id': id }, { $set: { 'itemsCount': 0 } }, { new: true });
		}).then(results => {
			if (!results) throw Error('Something went wrong setting itemsCount');

			return results;
		});
};