const { Item } = require('../../models/index');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Item.findOne({ '_id': id }, { __v: 0 });
		})
		.then(results => {
			if (!results) throw Error('item does not exist');

			return results;
		});
};