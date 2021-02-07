const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.any()', () => {
    let arrayIterator, emptyArrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
        emptyArrayIterator = ArrayIterator.from([]);
    });

    describe('without predicate', () => {
        it('should return whether the iterator contains any elements', () => {
            A.strictEqual(true, arrayIterator.any());
            A.strictEqual(false, emptyArrayIterator.any());
        });
    });

    describe('with predicate', () => {
        it('should return whether the iterator contains any elements matching the predicate', () => {
            A.strictEqual(true, arrayIterator.any(p => p % 2 === 0));
            A.strictEqual(false, arrayIterator.any(p => p > 10));
            A.strictEqual(false, emptyArrayIterator.any(p => p));
        });
    });
});
