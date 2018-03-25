const mongoose = require('mongoose');
const logic = require('../src/logic');
const { success, fail, validate, sha256, validatePassword } = require('../src/utils/api-helpers');
const assert = require('assert');
const expect = require('chai').expect;
const assertChai = require('chai').assert;

describe('Testing server API', () => {

	let idOfCollection = '';
	let idOfItem = '';
	let idOfUser = '';

	// Abrimos la conexión con MongoDB (al finalizar los test la cerraremos y borraremos la base de datos)
	before(function (done) {
		mongoose.connect('mongodb://localhost/untilnow_test');
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, '\nconnection error. Are MongoDB server running?\n\n'));
		db.once('open', function () {
			console.log('\nConnected to "untilnow_test" database in "localhost"\n');
			done();
		});
	});


	it('should send and receive ping', (done) => {
		logic.ping()
			.then(result => {
				expect(result).to.equal('ping');
				done();
			}).catch(done);
	});

	it('should create new user', (done) => {
		logic.registerUser('JohnDoe','JoDo1234*')
			.then(result => {
				expect(mongoose.Types.ObjectId.isValid(result)).to.be.true;
				idOfUser = result.toString();
				done();
			}).catch(done);
	});

	it('should retrieve user', (done) => {
		logic.retrieveUser(idOfUser)
			.then(result => {
				expect(mongoose.Types.ObjectId.isValid(result._id)).to.be.true;
				assertChai.isObject(result);
				assert.equal(result.toString().charAt(0), '{');
				assert.equal(result.toString().slice(-1), '}');
				expect(result).not.to.be.empty;
				done();
			}).catch(done);
	});

	it('Should login user', (done) => {
		logic.loginUser('JohnDoe','JoDo1234*')
			.then((result) => {
				expect(mongoose.Types.ObjectId.isValid(result._id)).to.be.true;
				assertChai.isObject(result);
				assert.equal(result.toString().charAt(0), '{');
				assert.equal(result.toString().slice(-1), '}');
				assert.equal(result.username.toString(), 'JohnDoe');
				expect(result).not.to.be.empty;
				done();
			}).catch(done);
	});

	it('should create collection', (done) => {
		logic.createCollection('dummyData', idOfUser)
			.then(result => {
				expect(mongoose.Types.ObjectId.isValid(result)).to.be.true;
				idOfCollection = result.toString();
				done();
			}).catch(done);
	});

	it('should return a collection', (done) => {
		logic.retrieveCollection(idOfCollection, idOfUser)
			.then(result => {
				assertChai.isObject(result);
				assert.equal(result.toString().charAt(0), '{');
				assert.equal(result.toString().slice(-1), '}');
				expect(result).not.to.be.empty;
				done();
			}).catch(done);
	});

	it('should list collections by user', (done) => {
		logic.listCollections(idOfUser)
			.then(result => {
				assert(result && result instanceof Array, 'results should be an Array');
				done();
			}).catch(done);
	});

	it('should list items', (done) => {
		logic.listItems(idOfUser)
			.then(result => {
				assert(result && result instanceof Array, 'results should be an Array');
				done();
			}).catch(done);
	});

	it('should list items in collection', (done) => {
		logic.listItemsInCollection(idOfCollection, idOfUser)
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

	it('should create item', (done) => {
		logic.createItem('dummyData', '2018-01-01', '2018-12-31', 'abc', 'my notes', idOfCollection, idOfUser)
			.then(result => {
				expect(mongoose.Types.ObjectId.isValid(result)).to.be.true;
				idOfItem = result.toString();
				done();
			}).catch(done);
	});

	it('should retrieve item', (done) => {
		logic.retrieveItem(idOfItem)
			.then(result => {
				assertChai.isObject(result);
				assert.equal(result.toString().charAt(0), '{');
				assert.equal(result.toString().slice(-1), '}');
				expect(result).not.to.be.empty;
				done();
			}).catch(done);
	});

	it('should delete an item', (done) => {
		logic.deleteItem(idOfItem)
			.then(result => {
				expect(mongoose.Types.ObjectId.isValid(result)).to.be.true;
				expect(result).not.to.be.empty;
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
			console.log('\nDrop database\n');
			mongoose.connection.close(done);
		});
	});
});

describe('Testing API utils', () => {

	it('should hash a string', () => {
		const stringHashed = sha256('secretPassword');
		expect(stringHashed).to.be.a('string');
		expect(stringHashed.length).to.equal(64);
		expect(stringHashed).to.equal('c3c9a0a7ed83ee612c4a3d0501c042778aed5d6399753d7d94ef9ba87c15de1c');
	});

	it('should not be equal', () => {
		const stringHashed = sha256('otherPass');
		expect(stringHashed).not.to.equal('c3c9a0a7ed83ee612c4a3d0501c042778aed5d6399753d7d94ef9ba87c15de1c');
		expect(stringHashed).to.be.a('string');
		expect(stringHashed.length).to.equal(64);
	});

	it('should return success object', () => {
		const result = success('dummydata');
		assertChai.isObject(result);
		assert.equal(JSON.stringify(result).charAt(0), '{');
		assert.equal(JSON.stringify(result).slice(-1), '}');
		expect(JSON.stringify(result).search(/OK/)).to.be.gt(-1);
		expect(result).not.to.be.empty;
	});

	it('should return fail object', () => {
		const result = fail('dummydata');
		assertChai.isObject(result);
		assert.equal(JSON.stringify(result).charAt(0), '{');
		assert.equal(JSON.stringify(result).slice(-1), '}');
		expect(JSON.stringify(result).search(/ERROR/)).to.be.gt(-1);
		expect(result).not.to.be.empty;
	});

	it('should throw error for value undefined', () => {
		expect(() => { validate({undefined}); }).to.throw();
	});

	it('should throw error for not secure passwords', () => {
		expect(() => { validatePassword(undefined); }).to.throw();
		expect(() => { validatePassword(''); }).to.throw();
		expect(() => { validatePassword('abc'); }).to.throw();
		expect(() => { validatePassword('1234'); }).to.throw();
		expect(() => { validatePassword('ABC'); }).to.throw();
		expect(() => { validatePassword('aB12'); }).to.throw();

		expect(() => { validatePassword('aBcDe12_A#B*C'); }).not.to.throw();
	});
});