const A = require('assert');
const ArrayIterator = require('../../src/ArrayIterator');

describe('ArrayIterator.groupBy()', () => {
    let source, arrayIterator;
    let izumi, kyoko, yuki, toru;

    beforeEach(() => {
        izumi = { name: 'Izumi', job: 'Designer', age: 22 };
        kyoko = { name: 'Kyoko', job: 'Programmer', age: 22 };
        yuki = { name: 'Yuki', job: 'Programmer', age: 22 };
        toru = { name: 'Toru', job: 'Designer', age: 30 };
        source = [izumi, kyoko, yuki, toru];
        arrayIterator = ArrayIterator.from(source);
    });

    it('should return a new iterator', () => {
        const group = arrayIterator.groupBy(1);

        A.ok(group instanceof ArrayIterator);
        A.ok(group instanceof ArrayIterator.GroupIterator);
    });

    it('should group by a single property', () => {
        const grouping = arrayIterator.groupBy('job');

        const keys = ['Designer', 'Programmer'];
        let keyIteration = 0;

        A.strictEqual(2, grouping.count());

        for (const group of grouping) {
            const expectedKey = keys[keyIteration];
            const expectedArray = source.filter(p => p.job === expectedKey);
            let elementIteration = 0;

            A.strictEqual(group.key, expectedKey);
            A.deepStrictEqual(Array.from(group), expectedArray);

            for (const element of group) {
                const expectedElement = expectedArray[elementIteration];
                A.deepStrictEqual(element, expectedElement);

                elementIteration += 1;
            }

            keyIteration += 1;
        }
    });

    it('should group by the multiple properties', () => {
        const grouping = arrayIterator.groupBy(['job', 'age']);
        let keyIteration = 0;

        A.strictEqual(3, grouping.count());

        // Should result in the following structure
        // [
        //     [{ job: 'Designer', age: 22 }]: [
        //         { name: 'Izumi', job: 'Designer', age: 22 }
        //     ],
        //     [{ job: 'Programmer', age: 22  }]: [
        //         { name: 'Kyoko', job: 'Programmer', age: 22 },
        //         { name: 'Yuki', job: 'Programmer', age: 22 }
        //     ],
        //     [{ job: 'Designer', age: 30 }]: [
        //         { name: 'Toru', job: 'Designer', age: 30 }
        //     ]
        // ];

        for (const group of grouping) {
            switch (keyIteration) {
                case 0:
                    A.deepStrictEqual(group.key, { job: 'Designer', age: 22 });
                    A.deepStrictEqual(Array.from(group), [izumi]);
                    break;
                case 1:
                    A.deepStrictEqual(group.key, { job: 'Programmer', age: 22 });
                    A.deepStrictEqual(Array.from(group), [kyoko, yuki]);
                    break;
                case 2:
                    A.deepStrictEqual(group.key, { job: 'Designer', age: 30 });
                    A.deepStrictEqual(Array.from(group), [toru]);
                    break;
            }

            keyIteration += 1;
        }
    });

    it('should map the grouped values to the given "selector"', () => {
        const grouping = arrayIterator.groupBy('job', p => p.name);
        const collectedNames = [];

        for (const group of grouping)
            collectedNames.push(...Array.from(group));

        const result = collectedNames.sort();
        const expected = source.map(p => p.name).sort();

        A.deepStrictEqual(result, expected);
    });
});
