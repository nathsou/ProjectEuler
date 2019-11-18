
function memoize(f) {
    const memo = new Map();

    return n => {
        if (memo.has(n)) return memo.get(n);
        const res = f(n);
        memo.set(n, res);
        return res;
    };
}

module.exports = { memoize };