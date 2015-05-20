'use strict';

exports.isMethodArray = function isStringArray(method) {
	var validMethods = ['HEAD', 'GET'];

	if (exports.typeOf(method) !== 'array') {
		return false;
	}

	if (method.length === 0) {
		return false;
	}

	return method.reduce(function(valid, value) {
		return valid && (exports.typeOf(value) === 'string') && (validMethods.indexOf(value) > -1);
	}, true);

};

exports.typeOf = function typeOf(value) {
  return Object.prototype.toString.call(value)
    .replace(/^\[.+\s(.+?)\]$/, '$1')
    .toLowerCase();
};
