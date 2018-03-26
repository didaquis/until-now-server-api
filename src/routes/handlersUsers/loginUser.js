const { success } = require('../../utils/api-helpers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET: secret, JWT_EXP: expiration } = process.env;
const expiresIn = parseInt(expiration);

module.exports = (req, res) => {
	const { user } = req;

	const token = jwt.sign({
		id: user._id,
		username: user.username
	}, secret, { expiresIn });

	const response = {
		token,
		username: user.username,
		id: user._id
	};
	res.json(success(response));
};