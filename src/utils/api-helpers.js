/**
 * Generate a response text (successful)
 * 
 * @param {string} [data] - Data to send in response 
 */
function success(data) {
	const res = { status: 'OK' };
	if (data) res.data = data;
	return res;
}

/**
 * Generate a response text (failed)
 * 
 * @param {string} [error] - Error information to send in response 
 */
function fail(error) {
	const res = { status: 'ERROR' };
	if (error) res.error = error;
	return res;
}

/**
 * Validate if data is not empty or undefined
 * 
 * @param {string|number} data 
 * @throws Will throw an error if the argument is null, empty or undefined.
 */
function validate(data) {
    for (const prop in data) {
        const value = data[prop];

        if (typeof value === 'undefined' || !value.trim().length) throw Error(`${prop} cannot be undefined or empty`);
    }
}

module.exports = { success, fail, validate };