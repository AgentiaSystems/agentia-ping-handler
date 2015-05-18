'use strict';

var chai = require('chai');
var expect = chai.expect;
var PingHandler = require('../../');

describe('.set()/.get()', function () {

	before(function() {
		this.handler = new PingHandler();
	});

	describe('with invalid arguments', function () {

		it('should error when called with no arguments', function() {
			expect(function() {
				this.handler.set();
			}.bind(this)).to.throw('Invalid number of arguments.');
		});

		it('should error when called with invalid option', function() {
			var key = 'invalid';
			expect(function() {
				this.handler.set(key, 'value');
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" is not a valid setting option.');
		});

		it('should error when not setting "path" to a string', function() {
			var key = 'path';
			expect(function() {
				this.handler.set(key, false);
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" must be a string.');
		});

		it('should error when not setting "methods" to a string/array of strings', function() {
			var key = 'methods';

			expect(function() {
				this.handler.set(key, false);
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" must be a string or an array of strings.');

			expect(function() {
				this.handler.set(key, 999);
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" must be a string or an array of strings.');

			expect(function() {
				this.handler.set(key, {'invalid': 'value'});
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" must be a string or an array of strings.');
		});

		it('should error when not setting "payload" to a string/object', function() {
			var key = 'payload';

			expect(function() {
				this.handler.set(key, false);
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" must be a string or an object.');

			expect(function() {
				this.handler.set(key, 999);
			}.bind(this)).to.throw('Invalid configuration settings. "' + key + '" must be a string or an object.');
		});

	});

	describe('with valid arguments', function () {

		it('should set "path"', function () {
			var option = 'path',
				value = '/valid/path';
			this.handler.set(option, value);
			expect(this.handler.get(option)).to.be.an('string');
			expect(this.handler.get(option)).to.equal(value);
		});

		it('should set "methods" (string)', function () {
			var option = 'methods',
				setValue = 'GET';
			this.handler.set(option, setValue);

			var getValue = this.handler.get(option);
			expect(getValue).to.be.an('array');
			expect(getValue.length).to.equal(1);
			expect(getValue[0]).to.equal(setValue);
		});

		it('should set "methods" (string array)', function () {
			var option = 'methods',
				setValue = ['GET', 'HEAD'];
			this.handler.set(option, setValue);

			var getValue = this.handler.get(option);
			expect(getValue).to.be.an('array');
			expect(getValue.length).to.equal(2);
			expect(getValue[0]).to.equal(setValue[0]);
			expect(getValue[1]).to.equal(setValue[1]);
		});

		it('should set "payload" (string)', function () {
			var option = 'payload',
				value = 'VALID RESPONSE';
			this.handler.set(option, value);
			expect(this.handler.get(option)).to.be.an('string');
			expect(this.handler.get(option)).to.equal(value);
		});

		it('should set "payload" (object)', function () {
			var option = 'payload',
				value = {'option': 'valid'};
			this.handler.set(option, value);
			expect(this.handler.get(option)).to.be.an('object');
			expect(this.handler.get(option)).to.deep.equal(value);
		});

	});

});
