var should = require('should');
var supervizer = require('./supervisor');

describe('supervizer', function() {
    describe('with no arguments', function() {
        it('returns an empty array', function() {
            var result = supervizer();
            result.should.eql([]);
        });
    });
});
