const { Collection } = require('../models/collectionModel');
const { Item } = require('../models/itemModel');
const { User } = require('../models/userModel');

const { validate } = require('../utils/api-helpers');

module.exports = {

	listCollections() {
		return Promise.resolve()
			.then(() => {
				return Collection.find( {}, { '__v': 0 } ).sort( { 'name': 1 } );
			})
			.then(results => {
				if (!results) throw Error('No collections available');

				return results;
			});
	},


	retrieveCollection(id) {
		return Promise.resolve()
			.then(() => {
				return Collection.findOne( { '_id': id }, { '__v': 0 } );
			}).then(results => {
				if (!results) throw Error('Collection does not exist');

				return results;
			});
	},

	setToZeroItemsCountInCollection(id) {
		return Promise.resolve()
			.then(()=> {
				return Collection.findByIdAndUpdate({'_id': id}, {$set : {'itemsCount' : 0}}, {new: true});
			}).then(results => {
				if(!results) throw Error('Something went wrong setting itemsCount');

				return results;
			});
	},

	incrementItemsCountInCollection(id) {
		return Promise.resolve()
			.then(()=> {
				return Collection.findByIdAndUpdate({'_id': id}, {$inc : {'itemsCount' : 1}}, {new: true});
			}).then(results => {
				if(!results) throw Error('Something went wrong incrementing itemsCount');

				return results;
			});
	},


	decrementItemsCountInCollection(id) {
		return Promise.resolve()
			.then(()=> {
				return Collection.findByIdAndUpdate({'_id': id}, {$inc : {'itemsCount' : -1}}, {new: true});
			}).then(results => {
				if(!results) throw Error('Something went wrong incrementing itemsCount');

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
				validate({ name, id_user });

				name = name.trim();
				id_user = id_user.trim();

				return Collection.create({ name, id_user });
			}).then(res => {
				return res._id;
			});
	},


	listItems() {
		return Promise.resolve()
			.then(() => {
				return Item.find({}, { __v: 0}).sort({ name: 1 });
			})
			.then(results => {
				if (!results) throw Error('No items available');

				return results;
			});
	},


	listItemsInCollection(id) {
		return Promise.resolve()
			.then(() => {
				return Item.find({'id_collection': id}, { __v: 0}).sort({ name: 1 });
			})
			.then(results => {
				if (!results) throw Error('No items available');

				return results;
			});
	},


	retrieveItem(id) {
		return Promise.resolve()
			.then(() => {
				return Item.findOne({ '_id': id }, { __v: 0});
			})
			.then(results => {
				if (!results) throw Error('Item does not exist');

				return results;
			});
	},


	deleteItem(id) {
		let idOfItem = '';
		return Promise.resolve()
			.then(() => {
				return Item.findByIdAndRemove(id);
			})
			.then(results => {
				if (!results) throw Error('Item does not exist');
				idOfItem = results._id;
				return this.decrementItemsCountInCollection(results.id_collection);
			}).then( () => idOfItem);
	},


	deleteItemsFromCollection(id){
		return Promise.resolve()
			.then(() => {
				return Item.remove({ 'id_collection': id });
			})
			.then(results => {
				if (!results) throw Error('Something went wrong');
				return this.setToZeroItemsCountInCollection(id);
			}).then( (res) => res);
	},


	createItem(name, dateStart, dateEnd, refNumber, notes, id_collection){
		let idOfItem = '';
		return Promise.resolve()
			.then(() => {
				validate({ name, dateStart, dateEnd, id_collection });

				name = name.trim();
				dateStart = dateStart.trim();
				dateEnd = dateEnd.trim();
				refNumber = refNumber.trim();
				notes = notes.trim();
				id_collection = id_collection.trim();

				return Item.create({ name, dateStart, dateEnd, refNumber, notes, id_collection });
			}).then(results => {
				if (!results) throw Error('Item was not created');
				idOfItem = results._id;
				return this.incrementItemsCountInCollection(results.id_collection);
			}).then( () => idOfItem);
	},


	retrieveUser(username, password) {
		return Promise.resolve()
			.then(() => {
				validate({ username, password });

				return User.findOne({ 'username': username, 'password': password }, { password: 0, __v: 0 });
			})
			.then(user => {
				if (!user) throw Error('User does not exist');

				return user;
			});
	}

};