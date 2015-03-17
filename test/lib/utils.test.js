var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	utils = require('../../lib/utils');

chai.use(sinonChai);

describe('utils.isMethodArray()', function () {

	it('should return FALSE if not a valid array of methods', function() {
		expect(utils.isMethodArray('INVALID')).to.equal(false);
		expect(utils.isMethodArray(999)).to.equal(false);
		expect(utils.isMethodArray(true)).to.equal(false);
		expect(utils.isMethodArray([])).to.equal(false);
		expect(utils.isMethodArray(['INVALID'])).to.equal(false);
	});

	it('should return TRUE if valid array of methods', function() {
		expect(utils.isMethodArray(['HEAD'])).to.equal(true);
		expect(utils.isMethodArray(['GET'])).to.equal(true);
		expect(utils.isMethodArray(['HEAD', 'GET'])).to.equal(true);
	});

});
