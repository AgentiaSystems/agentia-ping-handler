var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	httpMocks = require('node-mocks-http'),
	pingHandler = require('../../'),
	middleware = pingHandler.middleware(),
	req, res, next;

chai.use(sinonChai);

describe('.middleware()', function () {
	before(function() {
		next = sinon.stub();
	});

	beforeEach(function() {
		res = httpMocks.createResponse();
	});

	afterEach(function() {
		next.reset();
	});

	describe('with default settings', function() {

		it('should return 200/OK when GET /ping', function() {
			req  = httpMocks.createRequest({
				method: 'GET',
				url: '/ping'
			});

			middleware(req, res, next);
			expect(res._getStatusCode()).to.equal(200);
			expect(res._getData()).to.equal('OK');
			expect(res._isEndCalled()).to.be.false;
			expect(next).not.to.have.been.called;
		});

		it('should return 200/OK when HEAD /ping', function() {
			req  = httpMocks.createRequest({
				method: 'HEAD',
				url: '/ping'
			});

			middleware(req, res, next);
			expect(res._getStatusCode()).to.equal(200);
			expect(res._getData()).to.equal('');
			expect(res._isEndCalled()).to.be.true;
			expect(next).not.to.have.been.called;
		});

		it('should call next() when POST /ping', function() {
			req  = httpMocks.createRequest({
				method: 'POST',
				url: '/ping'
			});

			middleware(req, res, next);
			expect(next).to.be.called.once;
			expect(res._isEndCalled()).to.be.false;
		});

		it('should call next() when GET /invalid', function() {
			req  = httpMocks.createRequest({
				method: 'GET',
				url: '/invalid'
			});

			middleware(req, res, next);
			expect(next).to.be.called.once;
			expect(res._isEndCalled()).to.be.false;
		});

		it('should call next() when HEAD /invalid', function() {
			req  = httpMocks.createRequest({
				method: 'HEAD',
				url: '/invalid'
			});

			middleware(req, res, next);
			expect(next).to.be.called.once;
			expect(res._isEndCalled()).to.be.false;
		});

	});

	describe('with custom settings', function() {
		var payload = { 'key': 'value' },
			path = '/this/is/a/test';

		it('should return 200/custom JSON payload', function() {
			var data;
			req  = httpMocks.createRequest({
				method: 'GET',
				url: path
			});

			pingHandler.config({
				path: path,
				payload: payload
			});
			middleware(req, res, next);
			data = JSON.parse(res._getData());

			expect(data.key).to.equal(payload.key);
			expect(res._getStatusCode()).to.equal(200);
			expect(res._isJSON()).to.be.true;
			expect(res._isEndCalled()).to.be.false;
			expect(next).not.to.have.been.called;

		});

	});
});
