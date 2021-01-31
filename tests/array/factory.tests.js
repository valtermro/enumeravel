const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator', () => {
    describe('#empty()', () => {
        it('should return a new ArrayIterator with the elements of the source array', () => {
            const iterator = ArrayIterator.from([1, 2, 3, 4]);

            const result = Array.from(iterator);

            A.ok(iterator instanceof ArrayIterator);
            A.deepStrictEqual(result, [1, 2, 3, 4]);
        });
    });

    describe('#from()', () => {
        it('should return a new iterator with no elements', () => {
            const iterator = ArrayIterator.empty();

            const result = Array.from(iterator);

            A.ok(iterator instanceof ArrayIterator);
            A.ok(iterator instanceof ArrayIterator.EmptyIterator);
            A.deepStrictEqual(result, []);
        });
    });

    describe('#range()', () => {
        it('should return a new iterator with numbers from start to end-1', () => {
            const iterator = ArrayIterator.range(1, 5);

            const result = Array.from(iterator);

            A.ok(iterator instanceof ArrayIterator);
            A.ok(iterator instanceof ArrayIterator.RangeIterator);
            A.deepStrictEqual(result, [1, 2, 3, 4]);
        });
    });

    describe('#repeat()', () => {
        it('should return a new iterator with an element repeated N times', () => {
            const iterator = ArrayIterator.repeat(42, 2);

            const result = Array.from(iterator);

            A.ok(iterator instanceof ArrayIterator);
            A.ok(iterator instanceof ArrayIterator.RepeatIterator);
            A.deepStrictEqual(result, [42, 42]);
        });
    });
});
