const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.select()', () => {
    let source, arrayIterator;

    beforeEach(() => {
        source = [1, 2, 3, 4];
        arrayIterator = ArrayIterator.from(source);
    });

    it('should return a new iterator', () => {
        const query = arrayIterator.select(p => new { id: p });

        A.ok(query instanceof ArrayIterator);
        A.ok(query instanceof ArrayIterator.SelectIterator);
    });

    it('should map the elements to the given function', () => {
        const query = arrayIterator.select(p => ({ id: p }));

        const result = Array.from(query);

        A.deepStrictEqual(result, [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    });
});
