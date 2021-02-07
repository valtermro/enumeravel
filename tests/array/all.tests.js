const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.all()', () => {
    let arrayIterator, emptyArrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
        emptyArrayIterator = ArrayIterator.from([]);
    });

    it('should return whether all elements match the predicate', () => {
        A.strictEqual(true, arrayIterator.all(p => p < 10));
        A.strictEqual(false, arrayIterator.all(p => p % 2 === 0));
    });

    it('should return true if there are no elements', () => {
        A.strictEqual(true, emptyArrayIterator.all(p => p));
    });
});
