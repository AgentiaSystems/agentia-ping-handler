'use strict';

var _ = require('lodash');

exports.isMethodArray = function isStringArray(method) {
	var methods = ['HEAD', 'GET'];

	if (!_.isArray(method)) {
		return false;
	}

	if (method.length === 0) {
		return false;
	}

	return _.reduce(method, function (check, value) {
		return check && _.isString(value) && _.includes(methods, value);
	}, true);
};
