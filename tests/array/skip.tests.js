const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.skip()', () => {
    let arrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
    });

    it('should return a new iterator', () => {
        const query = arrayIterator.skip(1);

        A.ok(query instanceof ArrayIterator);
        A.ok(query instanceof ArrayIterator.SkipIterator);
    });

    describe('without predicate', () => {
        it('should return up to N elements', () => {
            const query = arrayIterator.skip(2);

            const result = Array.from(query);

            A.deepStrictEqual(result, [3, 4]);
        });
    });

    describe('with predicate', () => {
        it('should return up to N elements that match the predicate', () => {
            const query = arrayIterator.skip(2, p => p % 2 !== 0);

            const result = Array.from(query);

            A.deepStrictEqual(result, [2, 4]);
        });
    });
});
