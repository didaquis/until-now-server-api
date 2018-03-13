const { Router } = require('express');
const router = Router();

const { Collection } = require('../../models/collectionModel');
const { success, fail } = require('../../utils/api-helpers');

module.exports = (req, res) => {

	Collection.find({}).sort({ name: 1})
	.then(results =>{
		res.json(success(results));
	})
	.catch(err => {
		return res.json(fail(err));
	});

};