var _ = require('lodash');

var middleware = function() {
	return function middleware(req, res, next) {
		var data;

		if (req.path === this.get('path')) {

			if (_.includes(this.get('methods'), req.method)) {
				switch (req.method) {
					case 'HEAD': {
						return res.status(200).end();
					}

					case 'GET': {
						data = this.get('payload') || 'OK';
						if (_.isString(data)) {
							return res.send(200, data);
						}
						if (_.isObject(data)) {
							return res.json(200, data);
						}
					}
				}
			}
		}

		next();

	}.bind(this);
};

module.exports = middleware;
