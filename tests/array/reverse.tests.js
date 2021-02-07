const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.reverse()', () => {
    let arrayIterator;

    beforeEach(() => {
        arrayIterator = ArrayIterator.from([1, 2, 3, 4]);
    });

    it('should return a new iterator', () => {
        const query = arrayIterator.reverse(p => p);

        A.ok(query instanceof ArrayIterator);
        A.ok(query instanceof ArrayIterator.ReverseIterator);
    });

    it('should revert the order of the elements', () => {
        const query = arrayIterator.reverse();

        const result = Array.from(query);

        A.deepStrictEqual(result, [4, 3, 2, 1]);
    });
});
