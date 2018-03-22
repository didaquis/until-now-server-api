// utils logic
const ping = require('./ping');

// collection logic
const listCollections = require('./listCollections');
const retrieveCollection = require('./retrieveCollection');
const setToZeroItemsCountInCollection = require('./setToZeroItemsCountInCollection');
const incrementItemsCountInCollection = require('./incrementItemsCountInCollection');
const decrementItemsCountInCollection = require('./decrementItemsCountInCollection');
const deleteCollection = require('./deleteCollection');
const createCollection = require('./createCollection');

// item logic
const listItems = require('./listItems');
const listItemsInCollection = require('./listItemsInCollection');
const retrieveItem = require('./retrieveItem');
const deleteItem = require('./deleteItem');
const deleteItemsFromCollection = require('./deleteItemsFromCollection');
const createItem = require('./createItem');

// user logic
const retrieveUser = require('./user/retrieveUser');

module.exports = {
	ping,
	listCollections,
	retrieveCollection,
	setToZeroItemsCountInCollection,
	incrementItemsCountInCollection,
	decrementItemsCountInCollection,
	deleteCollection,
	createCollection,
	listItems,
	listItemsInCollection,
	retrieveItem,
	deleteItem,
	deleteItemsFromCollection,
	createItem,
	retrieveUser
};