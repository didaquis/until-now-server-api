const { Router } = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../configAuth');

const handlerRegisterUser = require('./handlersUsers/registerUser');
const handlerLoginUser = require('./handlersUsers/loginUser');

const authRouter = Router();
const jsonBodyParser = bodyParser.json();


authRouter.post('/api/user', jsonBodyParser, handlerRegisterUser);

authRouter.use(passport.initialize());

authRouter.post('/api/login', [jsonBodyParser, passport.authenticate('local', { session: false })] , handlerLoginUser);


module.exports = authRouter;