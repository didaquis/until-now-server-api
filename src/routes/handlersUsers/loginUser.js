//const logic = require('../../logic');
const { success, fail } = require('../../utils/api-helpers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET: secret, JWT_EXP: expiration } = process.env;
const expiresIn = parseInt(expiration);

module.exports = (req, res) => {
	const { user } = req;
	
	try {
		const token = jwt.sign({
			id: user._id,
			username: user.username
		}, secret, { expiresIn });
		
		const response = {
			token,
			username: user.username
		};
		res.json(success(response));
	} catch (err) {
		res.json(fail(err.message));
	}
};