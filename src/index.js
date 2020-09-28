require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const mainRouter = require('./routes/mainRouter');

const formatConnection = process.env.MONGO_FORMAT_CONNECTION || 'standard';
const mongoDNSseedlist = process.env.MONGO_DNS_SEEDLIST_CONNECTION || '';
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const database = process.env.MONGO_DB;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

const mongooseConnectOptions = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };

if (formatConnection === 'DNSseedlist' && mongoDNSseedlist !== '') {
	mongoose.connect(mongoDNSseedlist, mongooseConnectOptions);
} else {
	if (mongoUser !== '' && mongoPass !== '') {
		mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@${host}:${port}/${database}`, mongooseConnectOptions);
	} else {
		mongoose.connect(`mongodb://${host}:${port}/${database}`, mongooseConnectOptions);
	}
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	if (formatConnection === 'DNSseedlist' && mongoDNSseedlist !== '') {
		console.log(`Connected with MongoDB service (DNSseedlist) using database "${database}"`);
	} else {
		console.log(`Connected with MongoDB service at "${host}" in port "${port}" using database "${database}"`);
	}

	initAPI();
});

function initAPI(){
	const app = express();

	app.use(cors());

	app.use('', mainRouter);

	app.use(function(req, res){
		res.status(404);
		res.json({ 'error': '404', 'message': 'URL not found' });
	});

	const port = process.env.PORT;
	app.listen(port, () => console.log(`\nAPI running on port: ${port}`));
}