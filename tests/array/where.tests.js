const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.where()', () => {
    let source, arrayIterator;

    beforeEach(() => {
        source = [1, 2, 3, 4];
        arrayIterator = ArrayIterator.from(source);
    });

    it('should return a new iterator', () => {
        const query = arrayIterator.where(p => p);

        A.ok(query instanceof ArrayIterator);
        A.ok(query instanceof ArrayIterator.WhereIterator);
    });

    it('should filter the source array', () => {
        const query = arrayIterator.where(p => p % 2 === 0);

        const result = Array.from(query);

        A.deepStrictEqual(result, [2, 4]);
    });

    it('should nest', () => {
        const query = arrayIterator.where(p => p % 2 === 0).where(p => p > 2);

        const result = Array.from(query);

        A.deepStrictEqual(result, [4]);
    });
});
