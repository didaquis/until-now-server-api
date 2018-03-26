const { Collection } = require('../../models/index');

module.exports = (id) => {
	return Promise.resolve()
		.then(() => {
			return Collection.findByIdAndUpdate({ '_id': id }, { $set: { 'itemsCount': 0 } }, { new: true });
		}).then(results => {
			if (!results) throw Error('something went wrong setting itemsCount');

			return results;
		});
};