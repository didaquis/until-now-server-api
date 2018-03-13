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

module.exports = { success, fail };