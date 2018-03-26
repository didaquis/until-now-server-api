const { Item } = require('../../models/index');

const decrementItemsCountInCollection = require('../collections/decrementItemsCountInCollection');

module.exports = (id) => {
	let idOfItem = '';
	return Promise.resolve()
		.then(() => {
			return Item.findByIdAndRemove(id);
		})
		.then(results => {
			if (!results) throw Error('item does not exist');
			idOfItem = results._id;
			return decrementItemsCountInCollection(results.id_collection);
		}).then(() => idOfItem);
};