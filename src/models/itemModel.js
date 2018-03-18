const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name     		: String,
    dateStart    	: Date,
	dateEnd      	: Date,
	refNumber		: String,
	notes			: String,
	id_collection		: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Collection'
	}
});

module.exports.Item = mongoose.model('Item', ItemSchema);