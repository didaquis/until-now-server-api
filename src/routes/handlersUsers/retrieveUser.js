const { Router } = require('express');
const router = Router();

const { User } = require('../../models/userModel');
const { success, fail, validate } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { body: { username, password } } = req;

	Promise.resolve()
		.then(() => {
			validate({ username, password });

			return User.findOne({ 'username': username, 'password': password }, { password: 0 })
		})
		.then(user => {
			if (!user) throw Error('user does not exist');

			return user;
		})
		.then(results =>{
			res.json(success(results));
		})
		.catch(err => {
			return res.json(fail(err.message));
		});

};