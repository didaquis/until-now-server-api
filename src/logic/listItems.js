const { Item } = require('../models/itemModel');

module.exports = () => {
	return Promise.resolve()
		.then(() => {
			return Item.find({}, { __v: 0 }).sort({ name: 1 });
		})
		.then(results => {
			if (!results) throw Error('No items available');

			return results;
		});
};