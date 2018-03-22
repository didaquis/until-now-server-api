const { Item } = require('../models/itemModel');

const decrementItemsCountInCollection = require('./decrementItemsCountInCollection');

module.exports = (id) => {
	let idOfItem = '';
	return Promise.resolve()
		.then(() => {
			return Item.findByIdAndRemove(id);
		})
		.then(results => {
			if (!results) throw Error('Item does not exist');
			idOfItem = results._id;
			return decrementItemsCountInCollection(results.id_collection);
		}).then(() => idOfItem);
};