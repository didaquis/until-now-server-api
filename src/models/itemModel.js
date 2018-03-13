const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name     		: String,
    dateStart    	: Date,
	dateEnd      	: Date,
	refNumber		: String,
	notes			: String,
	url				: String, 
	id_collection	: String
});

module.exports.Item = mongoose.model('Item', ItemSchema);