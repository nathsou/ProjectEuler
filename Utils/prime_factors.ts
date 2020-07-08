import { memoize } from './memoize';
import { skip } from './iters';

function _factorize(n: number): number[] {
    if (n === 2) return [2];
    if (n % 2 === 0) return [2, ..._factorize(n / 2)];

    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
            return [i, ..._factorize(n / i)];
        }
    }

    return [n]; // n is prime
}

export const factorize = memoize(_factorize);

export function primeFactorsWithExponents(n: number): Array<[number, number]> {
    const factors = factorize(n);
    const withExponents = [];

    let prev = factors[0];
    let count = 1;

    for (const k of skip(factors, 1)) {
        if (prev === k) {
            count++;
        } else {
            withExponents.push([prev, count]);
            prev = k;
            count = 1;
        }
    }

    withExponents.push([prev, count]);

    return withExponents;
}

const factorize_ref = (n: number, factors: number[]) => {
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

function _factorize2(n: number): number[] {
    const factors = [];
    factorize_ref(n, factors);
    return factors;
}

export const factorize2 = memoize(_factorize2);