const { Collection } = require('../models/collectionModel');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Collection.findByIdAndUpdate({ '_id': id }, { $inc: { 'itemsCount': -1 } }, { new: true });
		}).then(results => {
			if (!results) throw Error('Something went wrong incrementing itemsCount');

			return results;
		});
};