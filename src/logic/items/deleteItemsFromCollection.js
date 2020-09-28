const { Item } = require('../../models/index');

const setToZeroItemsCountInCollection = require('../collections/setToZeroItemsCountInCollection');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Item.deleteMany({ 'id_collection': id });
		})
		.then(results => {
			if (!results) throw Error('something went wrong');
			return setToZeroItemsCountInCollection(id);
		}).then((res) => res);
};