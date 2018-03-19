const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
	name: { 
		type: String,
		required: true
	},
	itemsCount: {
		type: Number,
		min: 0,
		default: 0
	},
	id_user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports.Collection = mongoose.model('Collection', CollectionSchema);