const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.count()', () => {
    let arrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
    });

    describe('without predicate', () => {
        it('should return the number of elements', () => {
            const result = arrayIterator.count();

            A.strictEqual(result, 4);
        });
    });

    describe('with predicate', () => {
        it('should return the number of elements that matches the predicate', () => {
            const result = arrayIterator.count(p => p > 2);

            A.strictEqual(result, 2);
        });
    });
});
