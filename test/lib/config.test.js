var _ = require('lodash'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	ping = require('../../')();

chai.use(sinonChai);

describe('.config()', function () {

	before(function () {
		sinon.stub(ping, '__error');
		sinon.stub(ping, 'set');
	});

	after(function() {
		ping.__error.restore();
		ping.set.restore();
	});

	describe('with invalid arguments', function () {

		afterEach(function () {
			ping.__error.reset();
		});

		it('should error when called with no arguments', function() {
			ping.config();
			expect(ping.__error).to.have.been.called.once;
			expect(ping.__error).to.have.been.calledWithExactly('Invalid configuration settings. Must be an object.', 'TypeError');
		});

		it('should error when called with a non-object', function() {
			ping.config('invalid');
			expect(ping.__error).to.have.been.called.once;
			expect(ping.__error).to.have.been.calledWithExactly('Invalid configuration settings. Must be an object.', 'TypeError');
		});

		it('should error when called with an invalid option', function() {
			ping.config({
				'invalid': 'value'
			});
			expect(ping.__error).to.have.been.called.once;
			expect(ping.__error).to.have.been.calledWithExactly('Invalid configuration settings. "invalid" is not a valid setting.', 'ConfigError');
		});

	});

	describe('with valid arguments', function () {

		it('should call .set() for every option passed', function () {
			var options = {
				'path': '/valid/path'
			};

			ping.config(options);
			expect(ping.set).to.be.called.once;
			expect(ping.set).to.have.been.calledWithExactly('path', '/valid/path');
			ping.set.reset();

			options = {
				'path': '/valid/path',
				'methods': ['GET', 'HEAD'],
				'payload': 'GOOD'
			};

			ping.config(options);
			expect(ping.set).to.be.called.thrice;
			expect(ping.set.getCall(0)).to.have.been.calledWithExactly('path', '/valid/path');
			expect(ping.set.getCall(1)).to.have.been.calledWithExactly('methods', ['GET', 'HEAD']);
			expect(ping.set.getCall(2)).to.have.been.calledWithExactly('payload', 'GOOD');
		});

	});

});
