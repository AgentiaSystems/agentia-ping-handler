'use strict';

var utils = require('./utils');

var middleware = function() {
	return function middleware(req, res, next) {
		var data;

		if (req.path === this.get('path')) {

			if (~this.get('methods').indexOf(req.method)) {
				// handle HEAD method
				if (req.method === 'HEAD') {
					return res.end();
				}

				// handle GET method
				data = this.get('payload');
				if (utils.typeOf(data) === 'object') {
					return res.json(data);
				}
				return res.send(data);
			}
		}

		next();

	}.bind(this);
};

module.exports = middleware;
