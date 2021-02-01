const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.take()', () => {
    let source, arrayIterator, emptyArrayIterator;

    beforeEach(() => {
        source = [1, 2, 3, 4];
        arrayIterator = ArrayIterator.from(source);
        emptyArrayIterator = ArrayIterator.from([]);
    });

    it('should return a new iterator', () => {
        const query = arrayIterator.take(1);

        A.ok(query instanceof ArrayIterator);
        A.ok(query instanceof ArrayIterator.TakeIterator);
    });

    describe('without predicate', () => {
        it('should return up to N elements', () => {
            const query = arrayIterator.take(2);

            const result = Array.from(query);

            A.deepStrictEqual(result, [1, 2]);
        });
    });

    describe('with predicate', () => {
        it('should return up to N elements that match the predicate', () => {
            const query = arrayIterator.take(2, p => p % 2 === 0);

            const result = Array.from(query);

            A.deepStrictEqual(result, [2, 4]);
        });
    });
});
