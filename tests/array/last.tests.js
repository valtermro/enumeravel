const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.last()', () => {
    let arrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
    });

    describe('without predicate', () => {
        it('should return the last element', () => {
            const result = arrayIterator.last();

            A.strictEqual(result, 4);
        });
    });

    describe('with predicate', () => {
        it('should return the last element that matches the predicate', () => {
            const result = arrayIterator.last(p => p % 2 !== 0);

            A.strictEqual(result, 3);
        });
    });
});
