module.exports = function equal(left, right) {
    if (left == null || right == null)
        return left === right;

    if (left === right)
        return left !== 0 || 1 / left === 1 / right;

    if (left !== left && right !== right)
        return true;

    if (typeof left !== 'object')
        return left === right;

    if (typeof left.length === 'number' && typeof right.length === 'number') {
        if (left.length !== right.length)
            return false;

        for (let i = 0; i < left.length; i++) {
            if (!equal(left[i], right[i]))
                return false;
        }
        return true;
    }

    if (left.constructor === Object && right.constructor === Object) {
        for (const k in right) {
            if (!(k in left))
                return false;
        }

        for (const k in left) {
            if (!equal(left[k], right[k]))
                return false;
        }
        return true;
    }

    return false;
};
