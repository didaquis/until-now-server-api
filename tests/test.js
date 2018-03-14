const mongoose = require('mongoose')
const logic = require('../src/logic');
const assert = require('assert');

describe('Testing server API', () => {

	// Abrimos la conexión con MongoDB
	before(function (done) {
		mongoose.connect('mongodb://localhost/untilnow_test');
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, '\nconnection error. Are MongoDB server running?\n\n'));
		db.once('open', function () {
			console.log('Connected to test database!');
			done();
		});
	});

	// Tests
	it('should list collections', (done) => {
		logic.listCollections()
			.then(collections => {
				assert(collections && collections instanceof Array, 'results shold be an Array');

				done();
			}).catch(done);

	});

	// Cerramos la conexión a la base de datos
	after(function (done) {
		mongoose.connection.db.dropDatabase(function () {
			mongoose.connection.close(done);
		});
	});
});