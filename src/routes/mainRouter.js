const { Router } = require('express');
const bodyParser = require('body-parser');

// utils
const handlerPing = require('./handlersUtils/ping');

// users
const handlerRetrieveUser = require('./handlersUsers/retrieveUser');
const handlerRegisterUser = require('./handlersUsers/registerUser');

// collections
const handlerListCollections = require('./handlersCollections/listCollections');
const handlerRetrieveCollection = require('./handlersCollections/retrieveCollection');
const handlerDeleteCollection = require('./handlersCollections/deleteCollection');
const handlerCreateCollection = require('./handlersCollections/createCollection');

// items
const handlerListItems = require('./handlersItems/listItems');
const handlerRetrieveItem = require('./handlersItems/retrieveItem');
const handlerDeleteItem = require('./handlersItems/deleteItem');
const handlerListItemsInCollection = require('./handlersItems/listItemsInCollection');
const handlerCreateItem = require('./handlersItems/createItem');

const mainRouter = Router();
const jsonBodyParser = bodyParser.json();

// util
mainRouter.get('/api/ping', jsonBodyParser, handlerPing);

// users
mainRouter.get('/api/user/:id', jsonBodyParser, handlerRetrieveUser);
mainRouter.post('/api/user', jsonBodyParser, handlerRegisterUser);

// collections
mainRouter.get('/api/collections', jsonBodyParser, handlerListCollections);
mainRouter.get('/api/collection/:id', jsonBodyParser, handlerRetrieveCollection);
mainRouter.delete('/api/collection/:id', jsonBodyParser, handlerDeleteCollection);
mainRouter.post('/api/collection/', jsonBodyParser, handlerCreateCollection);

// items
mainRouter.get('/api/items', jsonBodyParser, handlerListItems);
mainRouter.get('/api/item/:id', jsonBodyParser, handlerRetrieveItem);
mainRouter.delete('/api/item/:id', jsonBodyParser, handlerDeleteItem);
mainRouter.get('/api/items/:id', jsonBodyParser, handlerListItemsInCollection);
mainRouter.post('/api/item/', jsonBodyParser, handlerCreateItem);

module.exports = mainRouter;