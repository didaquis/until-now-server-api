const logic = require('../../logic');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { params: { id, id_user } } = req;

	logic.listItemsInCollection(id, id_user)
		.then(results => {
			res.json(success(results));
		})
		.catch(err => {
			return res.json(fail(err.message));
		});
};