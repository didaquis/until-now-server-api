const { Collection } = require('../../models/index');

const deleteItemsFromCollection = require('../items/deleteItemsFromCollection');

module.exports = (_id) => {
	return Promise.resolve()
		.then(() => {
			return deleteItemsFromCollection(_id);
		}).then(() => {
			return Collection.findByIdAndRemove({ _id });
		})
		.then(results => {
			if (!results) throw Error('collection does not exist');

			return results;
		});
};