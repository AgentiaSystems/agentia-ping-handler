var _ = require('lodash'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	ping = require('../../lib/pingHandler')();

chai.use(sinonChai);

describe('.set()/.get()', function () {

	before(function () {
		sinon.stub(ping, '__error');
	});

	after(function() {
		ping.__error.restore();
	})

	describe('with invalid arguments', function () {

		afterEach(function() {
			ping.__error.reset();
		});

		it('should error when called with no arguments', function() {
			ping.set();
			expect(ping.__error).to.have.been.called.once;
			expect(ping.__error).to.have.been.calledWithExactly('Invalid number of arguments.', 'ConfigError');
		});

		it('should error when called with invalid option', function() {
			var key = 'invalid';
			ping.set(key, 'value');
			expect(ping.__error).to.have.been.called.once;
			expect(ping.__error).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" is not a valid setting option.', 'ConfigError');
		});

		it('should error when not setting "path" to a string', function() {
			var key = 'path';
			ping.set(key, false);
			ping.set(key, 999);
			ping.set(key, {'invalid': 'value'});
			ping.set(key, ['invalid', 'value']);
			expect(ping.__error).to.have.callCount(4);
			expect(ping.__error.getCall(0)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string.', 'TypeError');
			expect(ping.__error.getCall(1)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string.', 'TypeError');
			expect(ping.__error.getCall(2)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string.', 'TypeError');
			expect(ping.__error.getCall(3)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string.', 'TypeError');
		});

		it('should error when not setting "methods" to a string/array of strings', function() {
			var key = 'methods';
			ping.set(key, false);
			ping.set(key, 999);
			ping.set(key, {'invalid': 'value'});
			expect(ping.__error).to.have.callCount(3);
			expect(ping.__error.getCall(0)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string or an array of strings.', 'TypeError');
			expect(ping.__error.getCall(1)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string or an array of strings.', 'TypeError');
			expect(ping.__error.getCall(2)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string or an array of strings.', 'TypeError');
		});

		it('should error when not setting "payload" to a string/object', function() {
			var key = 'payload';
			ping.set(key, false);
			ping.set(key, 999);
			expect(ping.__error).to.have.callCount(2);
			expect(ping.__error.getCall(0)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string or an object.', 'TypeError');
			expect(ping.__error.getCall(1)).to.have.been.calledWithExactly('Invalid configuration settings. "' + key + '" must be a string or an object.', 'TypeError');
		});

	});

	describe('with valid arguments', function () {

		it('should set "path"', function () {
			var option = 'path',
				value = '/valid/path';
			ping.set(option, value);
			expect(ping.get(option)).to.be.an('string');
			expect(ping.get(option)).to.equal(value);
		});

		it('should set "methods" (string)', function () {
			var option = 'methods',
				setValue = 'GET';
			ping.set(option, setValue);

			var getValue = ping.get(option);
			expect(getValue).to.be.an('array');
			expect(getValue.length).to.equal(1);
			expect(getValue[0]).to.equal(setValue);
		});

		it('should set "methods" (string array)', function () {
			var option = 'methods',
				setValue = ['GET', 'HEAD'];
			ping.set(option, setValue);

			var getValue = ping.get(option);
			expect(getValue).to.be.an('array');
			expect(getValue.length).to.equal(2);
			expect(getValue[0]).to.equal(setValue[0]);
			expect(getValue[1]).to.equal(setValue[1]);
		});

		it('should set "payload" (string)', function () {
			var option = 'payload',
				value = 'VALID RESPONSE';
			ping.set(option, value);
			expect(ping.get(option)).to.be.an('string');
			expect(ping.get(option)).to.equal(value);
		});

		it('should set "payload" (object)', function () {
			var option = 'payload',
				value = {'option': 'valid'};
			ping.set(option, value);
			expect(ping.get(option)).to.be.an('object');
			expect(ping.get(option)).to.deep.equal(value);
		});

	});

});
