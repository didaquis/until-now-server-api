const { Collection } = require('../models/collectionModel');
const { Item } = require('../models/itemModel');
const { User } = require('../models/userModel');

const { success, fail, validate } = require('../utils/api-helpers');

module.exports = {

	listCollections() {
		return Promise.resolve()
			.then(() => {
				return Collection.find({}).sort({ name: 1 });
			})
			.then(results => {
				return results;
			});
	},

	retrieveCollection(id) {
		return Promise.resolve()
			.then(() => {
				return Collection.findOne({ '_id': id });
			}).then(results => {
				return results;
			});
	},


	listItems() {
		return Promise.resolve()
			.then(() => {
				return Item.find({}).sort({ name: 1 });
			})
			.then(results => {
				return results;
			});
	},


	retrieveItem(id) {
		return Promise.resolve()
			.then(() => {
				return Item.findOne({ '_id': id });
			})
			.then(results => {
				return results;
			});
	},


	retrieveUser(username, password) {
		return Promise.resolve()
			.then(() => {
				validate({ username, password });

				return User.findOne({ 'username': username, 'password': password }, { password: 0 });
			})
			.then(user => {
				if (!user) throw Error('user does not exist');

				return user;
			});
	}

};