'use strict';

exports.isMethodArray = function isStringArray(method) {
	var validMethods = ['HEAD', 'GET'], valid;

	if (exports.typeOf(method) !== 'array') {
		return false;
	}

	if (method.length === 0) {
		return false;
	}

	valid = true;
	method.forEach(function(value) {
		valid = valid && (exports.typeOf(value) === 'string') && (validMethods.indexOf(value) > -1);
	});

	return valid;
};

exports.typeOf = function typeOf(value) {
  return Object.prototype.toString.call(value)
    .replace(/^\[.+\s(.+?)\]$/, '$1')
    .toLowerCase();
};
