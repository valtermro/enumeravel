const equal = require('./_util/equal');
const find = require('./_util/find');

const alwaysTrue = () => true;
const identity = p => p;

class ArrayIterator {
    static from(array) {
        return new ArrayIterator(array);
    }

    static empty() {
        return new ArrayIterator.EmptyIterator(null);
    }

    static range(start, end) {
        return new ArrayIterator.RangeIterator(start, end);
    }

    static repeat(element, count) {
        return new ArrayIterator.RepeatIterator(element, count);
    }

    constructor(array) {
        this._source = array;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this._source.length; ++i) {
            yield this._source[i];
        }
    }

    first(predicate) {
        const fn = predicate || alwaysTrue;

        for (const element of this) {
            if (fn(element)) return element;
        }
    }

    last(predicate) {
        return this.reverse().first(predicate);
    }

    toArray() {
        return Array.from(this);
    }

    reverse() {
        return new ArrayIterator.ReverseIterator(this);
    }

    where(predicate) {
        return new ArrayIterator.WhereIterator(this, predicate);
    }

    select(selector) {
        return new ArrayIterator.SelectIterator(this, selector);
    }

    take(qtd, predicate) {
        return new ArrayIterator.TakeIterator(this, qtd, predicate || alwaysTrue);
    }

    skip(qtd, predicate) {
        return new ArrayIterator.SkipIterator(this, qtd, predicate || alwaysTrue);
    }

    count(predicate) {
        const fn = predicate || alwaysTrue;
        let count = 0;

        for (const element of this) {
            if (fn(element)) count += 1;
        }
        return count;
    }

    any(predicate) {
        const fn = predicate || alwaysTrue;

        for (const element of this) {
            if (fn(element)) return true;
        }
        return false;
    }

    all(predicate) {
        for (const element of this) {
            if (!predicate(element)) return false;
        }
        return true;
    }

    groupBy(key, selector) {
        return new ArrayIterator.GroupIterator(this, key, selector || identity);
    }
}

ArrayIterator.EmptyIterator = class extends ArrayIterator {
    *[Symbol.iterator]() {
        // no elements
    }
};

ArrayIterator.RangeIterator = class extends ArrayIterator {
    constructor(start, end) {
        super(null);
        this._start = start;
        this._end = end;
    }

    *[Symbol.iterator]() {
        for (let i = this._start; i < this._end; ++i) {
            yield i;
        }
    }
};

ArrayIterator.RepeatIterator = class extends ArrayIterator {
    constructor(element, count) {
        super(null);
        this._element = element;
        this._count = count;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this._count; ++i) {
            yield this._element;
        }
    }
};

ArrayIterator.ReverseIterator = class extends ArrayIterator {
    *[Symbol.iterator]() {
        const array = Array.from(this._source);

        for (let i = array.length - 1; i >= 0; --i) {
            yield array[i];
        }
    }
};

ArrayIterator.WhereIterator = class extends ArrayIterator {
    constructor(iterator, predicate) {
        super(iterator);
        this._predicate = predicate;
    }

    *[Symbol.iterator]() {
        for (const element of this._source) {
            if (this._predicate(element))
                yield element;
        }
    }
};

ArrayIterator.SelectIterator = class extends ArrayIterator {
    constructor(iterator, selector) {
        super(iterator);
        this._selector = selector;
    }

    *[Symbol.iterator]() {
        for (const element of this._source) {
            yield this._selector(element);
        }
    }
};

ArrayIterator.TakeIterator = class extends ArrayIterator {
    constructor(iterator, qtd, predicate) {
        super(iterator);
        this._qtd = qtd;
        this._predicate = predicate;
    }

    *[Symbol.iterator]() {
        let i = 0;

        for (const element of this._source) {
            if (!this._predicate(element))
                continue;

            if (i++ < this._qtd)
                yield element;
            else
                break;
        }
    }
};

ArrayIterator.SkipIterator = class extends ArrayIterator {
    constructor(iterator, qtd, predicate) {
        super(iterator);
        this._qtd = qtd;
        this._predicate = predicate;
    }

    *[Symbol.iterator]() {
        let i = 0;

        for (const element of this._source) {
             if (this._qtd > i && this._predicate(element))
                i += 1;
            else
                yield element;
        }
    }
};

ArrayIterator.GroupIterator = class extends ArrayIterator {
    constructor(iterator, key, selector) {
        super(iterator);
        this._key = key;
        this._selector = selector;
    }

    *[Symbol.iterator]() {
        const groups = [];

        // TODO: there must be a bether way to do the grouping
        // TODO: Benchmark this.
        for (const element of this._source) {
            const key = createKey(this._key, element);
            let group = find(groups, p => equal(p[0], key));

            if (!group) {
                group = [key, []];
                groups.push(group);
            }
            group[1].push(element);
        }

        for (const [key, value] of groups) {
            const iterator = ArrayIterator.from(value).select(this._selector);
            yield new ArrayIterator.Grouping(key, iterator);
        }

        function createKey(configKey, element) {
            if (!Array.isArray(configKey))
                return element[configKey];

            const key = {};
            for (const k of configKey)
                key[k] = element[k];
            return key;
        }
    }
};

ArrayIterator.Grouping = class extends ArrayIterator {
    constructor(key, iterator) {
        super(iterator);
        this._key = key;
    }

    get key() {
        return this._key;
    }

    *[Symbol.iterator]() {
        yield* this._source;
    }
};


module.exports = ArrayIterator;
