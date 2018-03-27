const crypto = require('crypto');

/**
 * Generate a response text (successful)
 * @param {string} [data] - Data to send in response 
 */
function success(data) {
	const res = { status: 'OK' };
	if (data) res.data = data;
	return res;
}

/**
 * Generate a response text (failed)
 * @param {string} [error] - Error information to send in response 
 */
function fail(error) {
	const res = { status: 'ERROR' };
	if (error) res.error = error;
	return res;
}

/**
 * Validate if data is not empty or undefined
 * @param {object} data - Object with values should be string or number
 * @throws Will throw an error if the some value of object is null, empty or undefined.
 */
function validate(data) {
	for (const prop in data) {
		const value = data[prop];
		if (typeof value === 'undefined' || !value.trim().length) throw new Error(`${prop} cannot be undefined or empty`);
	}
}


/**
 * Hash string with sha-256 algorithm
 * @param  {String} text
 * @return {String} Hashed result, format hexadecimal
 */
function sha256(text){
	return crypto.createHash('sha256').update(text).digest('hex');
}


/**
 * Check if password have numbers, minus chars, mayús chars and at least a length of 8. These symbols are valid: ! * ^ ? + - _ @ # $ % & 
 * 
 * @param  {String} password
 * @throws Will throw an error if password providad not pass the check
 */
function validatePassword(password){
	if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/).test(password)){
		throw Error('password is not enough secure or have invalid chars');
	}
}

module.exports = { success, fail, validate, sha256, validatePassword };