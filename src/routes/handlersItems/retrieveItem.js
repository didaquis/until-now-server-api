const { Router } = require('express');
const router = Router();

const { Item } = require('../../models/itemModel');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { params: { id } } = req;

	Item.findOne({ '_id': id })
	.then(results =>{
		res.json(success(results));
	})
	.catch(err => {
		return res.json(fail(err));
	});

};