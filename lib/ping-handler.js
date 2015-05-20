'use strict';

var extend = require('extend');
var deprecate = require('depd')('PingHandler');
var utils = require('./utils');

var PingHandler = function(options) {
	var defaults = {
		'path': '/ping',
		'methods': ['GET', 'HEAD'],
		'payload': 'OK'
	};

	options = extend({}, defaults, utils.typeOf(options) === 'object' ? options : {});

	if (!(this instanceof PingHandler)) {
		return require('./middleware')(options);
	}

	deprecate('PingHandler() constructor');

	this._options = defaults;
	this.config(options);

	return this;
};

// public api
PingHandler.prototype.set = deprecate.function(require('./set'), 'PingHandler.set()');
PingHandler.prototype.get = deprecate.function(require('./set'), 'PingHandler.get()');
PingHandler.prototype.config = deprecate.function(require('./config'), 'PingHandler.config()');
PingHandler.prototype.middleware = deprecate.function(require('./middleware'), 'PingHandler.middleware()');

// create an instance and export it
module.exports = exports = PingHandler;
