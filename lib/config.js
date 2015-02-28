var _ = require('lodash');

var config = function config(settings) {
	// make sure settings is an object
	if (!_.isObject(settings)) {
		this.__error('Invalid configuration settings. Must be an object.', 'TypeError');
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
				return this.__error('Invalid configuration settings. "' + key + '" is not a valid setting.', 'ConfigError');
			}
		}
	}.bind(this));

	// allow chaining
	return this;
};

module.exports = config;
