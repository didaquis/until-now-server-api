const logic = require('../../logic');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { params: { id } } = req;

	logic.deleteCollection(id)
		.then(results => {
			res.json(success(results));
		})
		.catch(err => {
			return res.json(fail(err.message));
		});
};