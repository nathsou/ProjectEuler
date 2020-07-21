import { isPrime } from "../Utils/primes";

function cornerPrimes(n: number): number {
    let primes = 0;

    let m = n * n;
    for (let i = 0; i < 3; i++) {
        m -= n - 1;
        if (isPrime(m)) primes++;
    }

    return primes;
}

const pb58 = () => {
    let primes = 0;

    for (let n = 3 ;; n += 2) {
        primes += cornerPrimes(n);
        if (primes * 10 < 2 * n - 1) {
            return n;
        }
    }
};

console.log(pb58());