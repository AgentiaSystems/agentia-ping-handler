var _ = require('lodash');

/**
 * error handler
 * @param  {string} message error message/description
 * @param  {string} type    error message type/category
 */
var error = function error(message, type) {
	var err = new Error(),
		stack;

	if (!_.isString(message)) {
		message = 'An unexpected error has occured';
	};

	if (!_.isString(type)) {
		type = 'PingHandlerError';
	};

	err.message = message;
	err.name = type;

	// remove first two entries in the stack
	stack = err.stack.split('\n');
	stack.splice(1, 2);
	stack = stack.join('\n');

	// display custom message
	console.log('------------------------------------------------------------');
	console.log('Error in Agentia Ping Handler Middleware\n');
	console.log(stack);
	console.log('See https://github.com/JohnnyEstilles/agentia-ping-handler');
	console.log('------------------------------------------------------------');
	process.exit(1);
};

module.exports = error;
