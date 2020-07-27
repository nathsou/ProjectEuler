import { memoize } from './memoize';
import { skip, foldLeft, foldLeft2 } from './iters';

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

export const totient = (n: number): number => {
    const factors = primeFactorsWithExponents(n);
    return Math.round(foldLeft2(factors, (t, [p, _]) => t * (1 - 1 / p), n));
};