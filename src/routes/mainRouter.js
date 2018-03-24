const { Router } = require('express');
const bodyParser = require('body-parser');


// utils
const handlerPing = require('./handlersUtils/ping');
// users
const handlerRetrieveUser = require('./handlersUsers/retrieveUser');
const handlerRegisterUser = require('./handlersUsers/registerUser');
const handlerLoginUser = require('./handlersUsers/loginUser');
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

// configuración de passport y middlewares de autentificación
const passport = require('passport');
require('../configAuth');
mainRouter.use(passport.initialize());

// utils
mainRouter.get('/api/ping', jsonBodyParser, handlerPing);

// users
mainRouter.post('/api/user', jsonBodyParser, handlerRegisterUser);
mainRouter.post('/api/login', [jsonBodyParser, passport.authenticate('local', { session: false })] , handlerLoginUser);

mainRouter.use(passport.authenticate('jwt', { session: false })); // Securizamos el resto de rutas
mainRouter.get('/api/user/:id', jsonBodyParser, handlerRetrieveUser);

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