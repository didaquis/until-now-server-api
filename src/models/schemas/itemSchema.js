const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
	name: {
		type: String,
		required: true
	},
	dateStart: {
		type: Date,
		required: true
	},
	dateEnd: {
		type: Date,
		required: true
	},
	refNumber: String,
	notes: String,
	id_collection: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Collection',
		required: true
	},
	id_user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true
	}
});
