const logic = require('../../logic');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { body: { name, dateStart, dateEnd, refNumber, notes, id_collection } } = req;

	logic.createItem(name, dateStart, dateEnd, refNumber, notes, id_collection)
		.then(results => {
			res.json(success(results));
		})
		.catch(err => {
			return res.json(fail(err.message));
		});
};