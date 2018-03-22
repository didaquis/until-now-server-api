const { Item } = require('../models/itemModel');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Item.findOne({ '_id': id }, { __v: 0 });
		})
		.then(results => {
			if (!results) throw Error('Item does not exist');

			return results;
		});
};