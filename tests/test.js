const mongoose = require('mongoose')
const logic = require('../src/logic');
const assert = require('assert');
const expect = require('chai').expect;
const assertChai = require('chai').assert;

describe('Testing server API', () => {

	let idOfCollection = '';

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

	it('should create collection', (done) => {
		logic.createCollection('dummyData', '5aa6bb9e341a690ff909faee')
			.then(result => {
				expect(mongoose.Types.ObjectId.isValid(result)).to.be.true;
				idOfCollection = result.toString();
				done();
			}).catch(done);
	});

	it('should return a collection', (done) => {
		logic.retrieveCollection(idOfCollection)
			.then(result => {
				assertChai.isObject(result);
				assert.equal(result.toString().charAt(0), '{');
				assert.equal(result.toString().slice(-1), '}');
				expect(result).not.to.be.empty;
				done();
			}).catch(done);
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

	it('should list items in collection', (done) => {
		logic.listItemsInCollection(idOfCollection)
			.then(result => {
				assert(result && result instanceof Array, 'results should be an Array');
				done();
			}).catch(done);
	});

	it('should increment itemsCounts in collection', (done) => {
		logic.incrementItemsCountInCollection(idOfCollection)
			.then(result => {
				assert(result.itemsCount > 0, 'results should be greather than zero');
				done();
			}).catch(done);
	});

	it('should decrement itemsCounts in collection', (done) => {
		logic.decrementItemsCountInCollection(idOfCollection)
			.then(result => {
				assert(result.itemsCount == 0, 'results should be zero');
				done();
			}).catch(done);
	});

	it('should delete a collection', (done) => {
		logic.deleteCollection(idOfCollection)
			.then(result => {
				assertChai.isObject(result);
				assert.equal(result.toString().charAt(0), '{');
				assert.equal(result.toString().slice(-1), '}');
				expect(result).not.to.be.empty;
				done();
			}).catch(done);
	});

	//Cerramos la conexión a la base de datos y borramos la base de datos!
	after(function (done) {
		mongoose.connection.db.dropDatabase(function () {
			mongoose.connection.close(done);
		});
	});
});