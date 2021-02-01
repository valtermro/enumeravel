const alwaysTrue = () => true;

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

    reverse() {
        return new ArrayIterator.ReverseIterator(this);
    }

    where(predicate) {
        return new ArrayIterator.WhereIterator(this, predicate);
    }

    select(selector) {
        return new ArrayIterator.SelectIterator(this, selector);
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

    take(qtd, predicate) {
        return new ArrayIterator.TakeIterator(this, qtd, predicate || alwaysTrue);
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
}

module.exports = ArrayIterator;
