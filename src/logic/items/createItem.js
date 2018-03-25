const { Item } = require('../../models/itemModel');

const incrementItemsCountInCollection = require('../collections/incrementItemsCountInCollection');
const { validate } = require('../../utils/api-helpers');

module.exports = (name, dateStart, dateEnd, refNumber, notes, id_collection, id_user) => {
	let idOfItem = '';
	return Promise.resolve()
		.then(() => {
			validate({ name, dateStart, dateEnd, id_collection, id_user });

			name = name.trim();
			dateStart = dateStart.trim();
			dateEnd = dateEnd.trim();
			refNumber = refNumber.trim();
			notes = notes.trim();
			id_collection = id_collection.trim();

			return Item.create({ name, dateStart, dateEnd, refNumber, notes, id_collection, id_user });
		}).then(results => {
			if (!results) throw Error('item was not created');
			idOfItem = results._id;
			return incrementItemsCountInCollection(results.id_collection);
		}).then(() => idOfItem);
};