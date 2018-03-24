const passport = require('passport');
const LocalStrategy = require('passport-local');

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { JWT_SECRET: secret, JWT_EXP: expiration } = process.env;
const expiresIn = parseInt(expiration);

const logic = require('./logic/index');

passport.use(new LocalStrategy((username, password, done) => {
	logic.validateUser(username, password)
		.then(user => {
			if (!user) return done(null, false);
			done(null, user);
		})
		.catch(done);
}));

passport.use(new JwtStrategy({
	secretOrKey: secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
	const { username, password } = payload;
	logic.validateUser(username, password)
		.then(user => {
			if (!user) return done(null, false);
			done(null, user);
		})
		.catch(done);
}));