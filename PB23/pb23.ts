import { sum, divisors } from "../Utils/math";

const upperLimit = 28123;

const isAbundant = (n: number, sieve: Set<number>) => {
    if (sieve.has(n)) return true;

    const sumProperDivs = sum(divisors(n)) - n;

    if (sumProperDivs > n) {
        sieve.add(n);
        return true;
    }

    return false;
};

const genSieve = (max: number): Set<number> => {
    const sieve = new Set<number>();

    for (let n = 12; n < max; n++) {
        isAbundant(n, sieve);
    }

    return sieve;
};

const isSumOfTwoAbundantNumbers = (n: number, sieve: Set<number>): boolean => {
    // assumes [...sieve] is sorted in ascending order
    for (const m of sieve) {
        if (m >= n) break;
        if (sieve.has(n - m)) return true;
    }

    return false;
};

const pb22 = () => {
    const sieve = genSieve(upperLimit);
    let total = 0;

    for (let n = 1; n < upperLimit; n++) {
        if (!isSumOfTwoAbundantNumbers(n, sieve)) {
            total += n;
        }
    }

    return total;
};

console.log(pb22());