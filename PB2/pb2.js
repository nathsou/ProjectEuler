const { memoize } = require('../Utils/memoize.js');

const fib = memoize(n => {
    if (n < 2) return n + 1;
    return fib(n - 2) + fib(n - 1);
});

function sumFib(predicate = n => n % 2 == 0, max = 4 * 10 ** 6) {
    let next = 1, i = 0, sum = 0;

    while (next <= max) {
        next = fib(i++);
        if (predicate(next)) sum += next;
    }

    return sum;
}

console.log(sumFib());