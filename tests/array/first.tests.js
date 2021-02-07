const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.first()', () => {
    let arrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
    });

    describe('without predicate', () => {
        it('should return the first element', () => {
            const result = arrayIterator.first();

            A.strictEqual(result, 1);
        });
    });

    describe('with predicate', () => {
        it('should return the first element that matches the predicate', () => {
            const result = arrayIterator.first(p => p > 2);

            A.strictEqual(result, 3);
        });
    });
});
