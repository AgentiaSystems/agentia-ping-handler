'use strict';

var _ = require('lodash');

var middleware = function() {
	return function middleware(req, res, next) {
		var data;

		if (req.path === this.get('path')) {

			if (_.includes(this.get('methods'), req.method)) {
				switch (req.method) {
					case 'HEAD': {
						return res.end();
					}

					case 'GET': {
						data = this.get('payload');
						if (_.isObject(data)) {
							return res.json(data);
						}
						return res.send(data);
					}
				}
			}
		}

		next();

	}.bind(this);
};

module.exports = middleware;
