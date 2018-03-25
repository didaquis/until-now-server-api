const { Item } = require('../../models/itemModel');

module.exports = (id, id_user) => {
	return Promise.resolve()
		.then(() => {
			return Item.find({ 'id_collection': id, 'id_user': id_user }, { __v: 0 }).sort({ name: 1 });
		})
		.then(results => {
			if (!results) throw Error('no items available');

			return results;
		});
};