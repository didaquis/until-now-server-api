const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { JWT_SECRET: secret } = process.env;

const logic = require('./logic/index');

passport.use(new LocalStrategy((username, password, next) => {
	// Esta estrategia (local) es usada al tratar de hacer login
	logic.loginUser(username, password)
		.then(user => {
			if (!user) return next(null, false);
			next(null, user);
		})
		.catch(() => {
			next(null, false);
		});
}));

passport.use(new JwtStrategy({
	secretOrKey: secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, next) => {
	// Esta estrategia (jwt) se usa para validar que las peticiones vienen con el token de seguridad
	const { id } = payload;
	logic.retrieveUser(id)
		.then(user => {
			if (!user) return next(null, false);
			next(null, user);
		})
		.catch(next);
}));