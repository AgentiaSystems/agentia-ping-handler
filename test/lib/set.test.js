var _ = require('lodash'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	pingHandler = require('../../');

chai.use(sinonChai);

describe('.set()/.get()', function () {

	describe('with invalid arguments', function () {

		it('should error when called with no arguments', function() {
			expect(function() {
				pingHandler.set();
			}).to.throw('Invalid number of arguments.');
		});

		it('should error when called with invalid option', function() {
			var key = 'invalid';
			expect(function() {
				pingHandler.set(key, 'value');
			}).to.throw('Invalid configuration settings. "' + key + '" is not a valid setting option.');
		});

		it('should error when not setting "path" to a string', function() {
			var key = 'path';
			expect(function() {
				pingHandler.set(key, false);
			}).to.throw('Invalid configuration settings. "' + key + '" must be a string.');
		});

		it('should error when not setting "methods" to a string/array of strings', function() {
			var key = 'methods';

			expect(function() {
				pingHandler.set(key, false);
			}).to.throw('Invalid configuration settings. "' + key + '" must be a string or an array of strings.');

			expect(function() {
				pingHandler.set(key, 999);
			}).to.throw('Invalid configuration settings. "' + key + '" must be a string or an array of strings.');

			expect(function() {
				pingHandler.set(key, {'invalid': 'value'});
			}).to.throw('Invalid configuration settings. "' + key + '" must be a string or an array of strings.');
		});

		it('should error when not setting "payload" to a string/object', function() {
			var key = 'payload';

			expect(function() {
				pingHandler.set(key, false);
			}).to.throw('Invalid configuration settings. "' + key + '" must be a string or an object.');

			expect(function() {
				pingHandler.set(key, 999);
			}).to.throw('Invalid configuration settings. "' + key + '" must be a string or an object.');
		});

	});

	describe('with valid arguments', function () {

		it('should set "path"', function () {
			var option = 'path',
				value = '/valid/path';
			pingHandler.set(option, value);
			expect(pingHandler.get(option)).to.be.an('string');
			expect(pingHandler.get(option)).to.equal(value);
		});

		it('should set "methods" (string)', function () {
			var option = 'methods',
				setValue = 'GET';
			pingHandler.set(option, setValue);

			var getValue = pingHandler.get(option);
			expect(getValue).to.be.an('array');
			expect(getValue.length).to.equal(1);
			expect(getValue[0]).to.equal(setValue);
		});

		it('should set "methods" (string array)', function () {
			var option = 'methods',
				setValue = ['GET', 'HEAD'];
			pingHandler.set(option, setValue);

			var getValue = pingHandler.get(option);
			expect(getValue).to.be.an('array');
			expect(getValue.length).to.equal(2);
			expect(getValue[0]).to.equal(setValue[0]);
			expect(getValue[1]).to.equal(setValue[1]);
		});

		it('should set "payload" (string)', function () {
			var option = 'payload',
				value = 'VALID RESPONSE';
			pingHandler.set(option, value);
			expect(pingHandler.get(option)).to.be.an('string');
			expect(pingHandler.get(option)).to.equal(value);
		});

		it('should set "payload" (object)', function () {
			var option = 'payload',
				value = {'option': 'valid'};
			pingHandler.set(option, value);
			expect(pingHandler.get(option)).to.be.an('object');
			expect(pingHandler.get(option)).to.deep.equal(value);
		});

	});

});
