const mongoose = require('mongoose');

const { UserSchema, CollectionSchema, ItemSchema } = require('./schemas');

module.exports = {
	User: mongoose.model('User', UserSchema),
	Collection: mongoose.model('Collection', CollectionSchema),
	Item: mongoose.model('Item', ItemSchema)
};
