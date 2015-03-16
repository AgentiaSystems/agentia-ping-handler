'use strict';

var PingHandler = function(config) {
	if (!(this instanceof PingHandler)) {
		return new PingHandler(config);
	}

	this._options = {
		'path': '/ping',
		'methods': ['GET', 'HEAD'],
		'payload': 'OK'
	};

	if (typeof config === 'object') {
		this.config(config);
	}

	return this;
};

// public api
PingHandler.prototype.set = require('./set');
PingHandler.prototype.get = PingHandler.prototype.set;
PingHandler.prototype.config = require('./config');
PingHandler.prototype.middleware = require('./middleware');

// create an instance and export it
module.exports = exports = PingHandler;
