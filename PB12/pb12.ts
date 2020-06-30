import { divisorsCount, divisors } from '../Utils/math';
import { primeFactorsWithExponents } from '../Utils/prime_factors';

export function* triangularNumbers(max: number): IterableIterator<number> {
    let next = 0;

    for (let i = 1; i <= max; i++) {
        next += i;
        yield next;
    }
}

const pb12 = (count: number) => {
    for (const n of triangularNumbers(Infinity)) {
        if (divisorsCount(n) > count) {
            return n;
        }
    }
};

console.log(pb12(500));

// console.log(divisorsCount(28));