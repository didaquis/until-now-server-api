const { Router } = require('express');
const bodyParser = require('body-parser');



const handlerRetrieveUser = require('./handlersUsers/retrieveUser');

const handlerListCollections = require('./handlersCollections/listCollections');
const handlerRetrieveCollection = require('./handlersCollections/retrieveCollection');

const handlerListItems = require('./handlersItems/listItems');
const handlerRetrieveItem = require('./handlersItems/retrieveItem');
const handlerDeleteItem = require('./handlersItems/deleteItem');
const handlerListItemsInCollection = require('./handlersItems/listItemsInCollection');

const mainRouter = Router();

const jsonBodyParser = bodyParser.json();

mainRouter.post('/api/user', jsonBodyParser, handlerRetrieveUser);

mainRouter.get('/api/collections', jsonBodyParser, handlerListCollections);
mainRouter.get('/api/collection/:id', jsonBodyParser, handlerRetrieveCollection);

mainRouter.get('/api/items', jsonBodyParser, handlerListItems);
mainRouter.get('/api/item/:id', jsonBodyParser, handlerRetrieveItem);
mainRouter.delete('/api/item/:id', jsonBodyParser, handlerDeleteItem);
mainRouter.get('/api/items/:id', jsonBodyParser, handlerListItemsInCollection);

module.exports = mainRouter;