const { Router } = require('express');
const bodyParser = require('body-parser');


const handlerListCollections = require('./handlers/handlerListCollections');

const mainRouter = Router();

const jsonBodyParser = bodyParser.json();

mainRouter.get('/api/collections', jsonBodyParser, handlerListCollections);

module.exports = mainRouter;