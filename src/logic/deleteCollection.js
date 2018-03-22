const { Collection } = require('../models/collectionModel');

const deleteItemsFromCollection = require('./deleteItemsFromCollection');

module.exports = (_id) => {
	return Promise.resolve()
		.then(() => {
			return deleteItemsFromCollection(_id);
		}).then(() => {
			return Collection.findByIdAndRemove({ _id });
		})
		.then(results => {
			if (!results) throw Error('Collection does not exist');

			return results;
		});
};