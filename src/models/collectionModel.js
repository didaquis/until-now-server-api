const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = require('./itemModel');

const CollectionSchema = new Schema({
	name : String,
	id_user : {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User'
	}
});

CollectionSchema.pre('findOneAndRemove', function(next) {
	this.model(Item).remove({ id_collection: this._id })
		.then(next())
});


module.exports.Collection = mongoose.model('Collection', CollectionSchema);