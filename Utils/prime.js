const { memoize } = require('../Utils/memoize.js');

function genSieve(count) {
    const primes = [2];

    for (let i = 3; primes.length !== count; i += 2) {
        isPrimeSieve(i, primes);
    }

    return primes;
}

function genSieveLessThan(max) {
    const primes = [2];

    for (let i = 3; i <= max; i += 2) {
        isPrimeSieve(i, primes);
    }

    return primes;
}

function isPrimeSieve(n, sieve) {
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let p of sieve) {
        if (p * p > n) break;
        if (n % p === 0) return false;
    }

    sieve.push(n);
    return true;
}

function isPrime(n) {
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return false;
    }

    return true;
}

module.exports = {
    isPrimeSieve,
    isPrime,
    isPrimeMemoized: memoize(isPrime),
    genSieve,
    genSieveLessThan
}