const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
	name     		: String,
	id_user			: String
});


module.exports.Collection = mongoose.model('Collection', CollectionSchema);