const { memoize } = require('./memoize.js');

function factorize(n) {
    if (n === 2) return [2];
    if (n % 2 === 0) return [2, ...factorize(n / 2)];

    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
            return [i, ...factorize(n / i)];
        }
    }

    return [n]; // n is prime
}

const factorize_ref = (n, factors) => {
    if (n === 2) factors.push(2);
    if (n % 2 === 0) {
        factors.push(2);
        factorize_ref(n / 2, factors);
    }

    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
            factors.push(i);
            factorize_ref(n / i, factors);
            return;
        }
    }

    factors.push(n); // n is prime
};

function factorize2(n) {
    const factors = [];
    factorize_ref(n, factors);

    return factors;
}


module.exports = {
    factorize: memoize(factorize),
    factorize2: memoize(factorize2)
};