'use strict';

var _ = require('lodash');

var config = function config(settings) {
	// make sure settings is an object
	if (!_.isObject(settings)) {
		throw new Error('Invalid configuration settings. Must be an object.');
	}

	// parse settings
	_.each(settings, function(value, key) {
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
	}.bind(this));

	// allow chaining
	return this;
};

module.exports = config;
