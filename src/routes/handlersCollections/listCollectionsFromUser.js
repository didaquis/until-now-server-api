const logic = require('../../logic');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { body: { id_user } } = req;
	logic.listCollectionsFromUser(id_user)
		.then(results => {
			res.json(success(results));
		})
		.catch(err => {
			return res.json(fail(err.message));
		});
};