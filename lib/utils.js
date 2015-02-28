var _ = require('lodash');

exports.isMethodArray = function isStringArray(value) {
	var methods = ['HEAD', 'GET'];

	if (!_.isArray(value)) {
		return false;
	}

	if (value.length === 0) {
		return false;
	}

	return _.reduce(value, function (check, value) {
		return check && _.isString(value) && _.includes(methods, value);
	}, true);
};
