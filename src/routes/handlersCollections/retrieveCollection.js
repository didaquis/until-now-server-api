const { Router } = require('express');
const router = Router();

const { Collection } = require('../../models/collectionModel');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {
	const { params: { id } } = req;

	Collection.findOne({ '_id': id })
	.then(results =>{
		res.json(success(results));
	})
	.catch(err => {
		return res.json(fail(err));
	});

};