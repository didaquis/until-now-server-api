// utils logic
const ping = require('./utils/ping');

// collection logic
const listCollections = require('./collections/listCollections');
const retrieveCollection = require('./collections/retrieveCollection');
const setToZeroItemsCountInCollection = require('./collections/setToZeroItemsCountInCollection');
const incrementItemsCountInCollection = require('./collections/incrementItemsCountInCollection');
const decrementItemsCountInCollection = require('./collections/decrementItemsCountInCollection');
const deleteCollection = require('./collections/deleteCollection');
const createCollection = require('./collections/createCollection');

// item logic
const listItems = require('./items/listItems');
const listItemsInCollection = require('./items/listItemsInCollection');
const retrieveItem = require('./items/retrieveItem');
const deleteItem = require('./items/deleteItem');
const deleteItemsFromCollection = require('./items/deleteItemsFromCollection');
const createItem = require('./items/createItem');

// user logic
const retrieveUser = require('./user/retrieveUser');
const registerUser = require('./user/registerUser');
const validateUser = require('./user/validateUser');

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
	retrieveUser,
	registerUser,
	validateUser
};