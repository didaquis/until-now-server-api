const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name     		: String,
    dateStart    	: Date,
	dateEnd      	: Date,
	refNumber		: String,
	notes			: String,
	url				: String, 
});

const CollectionSchema = new Schema({
    name     		: String,
    items			: [ItemSchema] 
});

const UserSchema = new Schema({
	name     		: String,
	password		: String,
    collections		: [CollectionSchema] 
});

module.exports.User = mongoose.model('User', UserSchema);