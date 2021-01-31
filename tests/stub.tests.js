const A = require('assert');
const stub = require('../src/index');

describe('stub', () => {
    it('should return true', () => {
        A.strictEqual(stub(), true);
    });
});
