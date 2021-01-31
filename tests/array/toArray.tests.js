const A = require('assert');
const ArrayIterator = require('../../src/index');

describe('ArrayIterator.toArray()', () => {
    let source, arrayIterator;

    beforeEach(() => {
        source = [1, 2, 3, 4];
        arrayIterator = ArrayIterator.from(source);
    });

    it('should return the a new array with the elements in the iterator', () => {
        const result = arrayIterator.toArray();

        A.deepStrictEqual(result, [1, 2, 3, 4]);

        result[0] = 0;
        A.deepStrictEqual(source, [1, 2, 3, 4]);
    });
});
