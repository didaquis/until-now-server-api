const { Router } = require('express');
const router = Router();

const {User} = require('../../models/userModel');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {

	User.findOne({}, {collections: 1}).sort({ name: 1})
	.then(results =>{
		res.json(success(results));
	})
	.catch(err => {
		return res.json(fail(err));
	});

};