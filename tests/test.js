const mongoose = require('mongoose')
const logic = require('../src/logic');
const assert = require('assert');
const expect = require('chai').expect;

describe('Testing server API', () => {

	// Abrimos la conexión con MongoDB (al finalizar los test la cerraremos y borraremos la base de datos)
	before(function (done) {
		mongoose.connect('mongodb://localhost/untilnow_test');
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, '\nconnection error. Are MongoDB server running?\n\n'));
		db.once('open', function () {
			console.log('Connected to test database!');
			done();
		});
	});

	it('should list collections', (done) => {
		logic.listCollections()
			.then(result => {
				assert(result && result instanceof Array, 'results should be an Array');
				done();
			}).catch(done);
	});

	it('should list items', (done) => {
		logic.listItems()
			.then(result => {
				assert(result && result instanceof Array, 'results should be an Array');
				done();
			}).catch(done);
	});


	it('should create collection', (done) => {
		logic.createCollection('dummyData', '5aa6bb9e341a690ff909faee')
			.then(result => {
				console.log('result:' + result);
				expect(mongoose.Types.ObjectId.isValid(result)).to.be.true;
				done();
			}).catch(done);
	});


	// it('should return error', (done) => {
	// 	logic.retrieveCollection('ffffffffffffffffffffffff')
	// 		.then(result => {
	// 			//assert.throw(iThrowError(), Error, "Error thrown");
	// 			//assert.equal(result.status === 'ERROR', 'results should be ERROR');
	// 			//assert.notEqual(result === 'OK');
	// 			done();
	// 		}).catch(done);
	// });


	// it('should return error', (done) => {
	// 	logic.retrieveItem('ffffffffffffffffffffffff')
	// 		.then(result => {
	// 			//assert.equal(result.status === 'ERROR', 'results should be ERROR');
	// 			done();
	// 		}).catch(done);
	// });


	// Cerramos la conexión a la base de datos y borramos la base de datos!
	after(function (done) {
		mongoose.connection.db.dropDatabase(function () {
			mongoose.connection.close(done);
		});
	});
});