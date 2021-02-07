module.exports = function find(array, predicate) {
    for (let i = 0; i < array.length; ++i) {
        if (predicate(array[i]))
            return array[i];
    }
};
