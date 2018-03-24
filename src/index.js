require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter');
const mainRouter = require('./routes/mainRouter');

const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const database = process.env.MONGO_DB;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

if(mongoUser !== '' && mongoPass !== ''){
	// Si me especifican usuario y password...
	mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@${host}:${port}/${database}`);
}else{
	mongoose.connect(`mongodb://${host}:${port}/${database}`);
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log(`\nConnected with mongodb at "${host}" in port "${port}" using database "${database}"`);
	initAPI();
});

function initAPI(){
	const app = express();

	app.use(cors());

	app.use('', authRouter);
	app.use('', mainRouter);

	app.use(function(req, res){
		res.status(404);
		res.json({ "error": "404", "message": "URL not found" });
	});

	const port = process.env.PORT;
	app.listen(port, () => console.log(`\nAPI running on port: ${port}`));
}