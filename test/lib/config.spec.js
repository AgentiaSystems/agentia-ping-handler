var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	pingHandler = require('../../');

chai.use(sinonChai);

describe('.config()', function () {

	before(function () {
		sinon.stub(pingHandler, 'set');
	});

	after(function() {
		pingHandler.set.restore();
	});

	describe('with invalid arguments', function () {

		afterEach(function() {
			pingHandler.set.reset();
		});

		it('should error when called with no arguments', function() {
			var fn = function() {
				pingHandler.config();
			};
			expect(fn).to.throw('Invalid configuration settings. Must be an object.');
		});

		it('should error when called with a non-object', function() {
			var fn = function() {
				pingHandler.config('invalid');
			};
			expect(fn).to.throw('Invalid configuration settings. Must be an object.');
		});

		it('should error when called with an invalid option', function() {
			var fn = function() {
				pingHandler.config({
					'invalid': 'value'
				});
			};
			expect(fn).to.throw('Invalid configuration settings. "invalid" is not a valid setting.');
		});

	});

	describe('with valid arguments', function () {

		it('should call .set() for every option passed', function () {
			var options = {
				'path': '/valid/path'
			};

			pingHandler.config(options);
			expect(pingHandler.set).to.be.called.once;
			expect(pingHandler.set).to.have.been.calledWithExactly('path', '/valid/path');
			pingHandler.set.reset();

			options = {
				'path': '/valid/path',
				'methods': ['GET', 'HEAD'],
				'payload': 'GOOD'
			};

			pingHandler.config(options);
			expect(pingHandler.set).to.be.called.thrice;
			expect(pingHandler.set.firstCall).to.have.been.calledWithExactly('path', '/valid/path');
			expect(pingHandler.set.secondCall).to.have.been.calledWithExactly('methods', ['GET', 'HEAD']);
			expect(pingHandler.set.thirdCall).to.have.been.calledWithExactly('payload', 'GOOD');
		});

	});

});
