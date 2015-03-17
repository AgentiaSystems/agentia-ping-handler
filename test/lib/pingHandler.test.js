var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	PingHandler = require('../../lib/pingHandler');

chai.use(sinonChai);

describe('pingHandler()', function () {
	

	it('should set defaults when called without args', function() {
		var pingHandler = PingHandler();

		expect(pingHandler.get('path')).to.equal('/ping');
		expect(pingHandler.get('methods')).to.deep.equal(['GET', 'HEAD']);
		expect(pingHandler.get('payload')).to.equal('OK');		
	});

	it('should set options when called with object', function() {
		var pingHandler = PingHandler({
			'path': '/valid/path',
			'methods': 'HEAD',
			'payload': 'GOOD'
		});

		expect(pingHandler.get('path')).to.equal('/valid/path');
		expect(pingHandler.get('methods')).to.deep.equal(['HEAD']);
		expect(pingHandler.get('payload')).to.equal('GOOD');		
	});

});