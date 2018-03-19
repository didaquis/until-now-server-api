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
				if (!results) throw Error('No collections available');

				return results;
			});
	},


	retrieveCollection(id) {
		return Promise.resolve()
			.then(() => {
				return Collection.findOne({ '_id': id });
			}).then(results => {
				if (!results) throw Error('Collection does not exist');

				return results;
			});
	},


	deleteCollection(_id) {
		return Promise.resolve()
			.then(() => {
				return this.deleteItemsFromCollection(_id);
			}).then(() => {
				return Collection.findByIdAndRemove({ _id });
			})
			.then(results => {
				if (!results) throw Error('Collection does not exist');

				return results;
			});
	},

	createCollection(name, id_user){
		return Promise.resolve()
			.then(() => {
				return Collection.create({ name, id_user });
			}).then(res => {
				return res._id;
			});
	},

	listItems() {
		return Promise.resolve()
			.then(() => {
				return Item.find({}).sort({ name: 1 });
			})
			.then(results => {
				if (!results) throw Error('No items available');

				return results;
			});
	},


	listItemsInCollection(id) {
		return Promise.resolve()
			.then(() => {
				return Item.find({'id_collection': id}).sort({ name: 1 });
			})
			.then(results => {
				if (!results) throw Error('No items available');

				return results;
			});
	},


	retrieveItem(id) {
		return Promise.resolve()
			.then(() => {
				return Item.findOne({ '_id': id });
			})
			.then(results => {
				if (!results) throw Error('Item does not exist');

				return results;
			});
	},


	deleteItem(id) {
		return Promise.resolve()
			.then(() => {
				return Item.findByIdAndRemove(id);
			})
			.then(results => {
				if (!results) throw Error('Item does not exist');

				return results;
			});
	},


	deleteItemsFromCollection(id){
		return Promise.resolve()
			.then(() => {
				return Item.remove({ 'id_collection': id })
			})
			.then(results => {
				if (!results) throw Error('Item does not exist');

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
				if (!user) throw Error('User does not exist');

				return user;
			});
	}

};