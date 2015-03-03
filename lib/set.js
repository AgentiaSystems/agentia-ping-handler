var _ = require('lodash'),
	utils = require('./utils');

/**
 * set/get option
 * @param {string} key - name of option to set/get
 * @param {*} value - value to set
 */
var set = function set(key, value) {

	// if no arguments
	if (arguments.length  < 1 || arguments.length > 2) {
		return this.__error('Invalid number of arguments.', 'ConfigError');
	}

	// if only key argument exist, the treat as a get()
	if (arguments.length === 1) {
		return this._options[key];
	}

	switch (key) {
		case 'path': {
			if (!_.isString(value)) {
				return this.__error('Invalid configuration settings. "' + key + '" must be a string.', 'TypeError');
			}
			break;
		}

		case 'methods': {
			if (_.isString(value)) {
				value = [value];
			}
			if (!utils.isMethodArray(value)) {
				return this.__error('Invalid configuration settings. "' + key + '" must be a string or an array of strings.', 'TypeError');
			}
			break;
		}

		case 'payload': {
			if (!(_.isString(value) || _.isObject(value))) {
				return this.__error('Invalid configuration settings. "' + key + '" must be a string or an object.', 'TypeError');
			}
			break;
		}

		default: {
			return this.__error('Invalid configuration settings. "' + key + '" is not a valid setting option.', 'ConfigError');
		}
	}

	// store value
	this._options[key] = value;

	// allow chaining
	return this;
};

// export public api function
module.exports = set;
