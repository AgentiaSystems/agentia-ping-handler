var _ = require('lodash');

/**
 * PingHandler class
 * @constructor
 */
var PingHandler = function() {
	if (!(this instanceof PingHandler)) {
		return new PingHandler();
	}

	this._options = {
		'path': '/ping',
		'methods': ['GET', 'HEAD'],
		'payload': 'OK'
	};

	return this;
};

// public api
PingHandler.prototype.set = require('./set');
PingHandler.prototype.get = PingHandler.prototype.set;
PingHandler.prototype.config = require('./config');
PingHandler.prototype.middleware = require('./middleware');

// private api
PingHandler.prototype.__error = require('./error');

// create an instance and export it
module.exports = exports = PingHandler;
