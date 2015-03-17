'use strict';

var utils = require('./utils');

var config = function config(settings) {
	var key, value;
	// make sure settings is an object
	if (utils.typeOf(settings) !== 'object') {
		throw new Error('Invalid configuration settings. Must be an object.');
	}

	// parse settings
	for(key in settings) {
		value = settings[key];

		switch (key) {
			case 'path':
			case 'methods':
			case 'payload': {
				this.set(key, value);
				break;
			}

			default: {
				throw new Error('Invalid configuration settings. "' + key + '" is not a valid setting.');
			}
		}
	}

	// allow chaining
	return this;
};

module.exports = config;
