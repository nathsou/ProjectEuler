import { memoize } from './memoize';
import { repeat, indexed, cycle, It, take, filter, takeWhile } from './iters';
import { sum } from './math';

export function genSieve(count: number): number[] {
    const primes = [2];

    for (let i = 3; primes.length !== count; i += 2) {
        isPrimeSieve(i, primes);
    }

    return primes;
}

export function genSieveLessThan(max: number): number[] {
    const primes = [2];

    for (let i = 3; i <= max; i += 2) {
        isPrimeSieve(i, primes);
    }

    return primes;
}

export function isPrimeSieve(n: number, sieve: number[]): boolean {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let p of sieve) {
        if (p * p > n) break;
        if (n % p === 0) return false;
    }

    sieve.push(n);
    return true;
}

export function isPrimeSieveB(n: bigint, sieve: bigint[]): boolean {
    if (n < 2n) return false;
    if (n === 2n) return true;
    if (n % 2n === 0n) return false;

    for (let p of sieve) {
        if (p * p > n) break;
        if (n % p === 0n) return false;
    }

    sieve.push(n);
    return true;
}

export function isPrime(n: number): boolean {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return false;
    }

    return true;
}

export function isPrimeB(n: bigint): boolean {
    if (n < 2n) return false;
    if (n === 2n) return true;
    if (n % 2n === 0n) return false;

    for (let i = 3n; i * i <= n; i += 2n) {
        if (n % i === 0n) return false;
    }

    return true;
}

export function isPrimeSieved(): (n: number) => boolean {
    const sieve = [2];
    return (n: number) => isPrimeSieve(n, sieve);
}

export function isPrimeSievedB(): (n: bigint) => boolean {
    const sieve = [2n];
    return (n: bigint) => isPrimeSieveB(n, sieve);
}

export const isPrimeMemoized = memoize(isPrime);

// see http://mathproofs.blogspot.com/
export const buildOffsetList = (primes: number[]): number[] => {
    if (primes.length === 0) return [];
    if (primes.length === 1) return [primes[0]];

    const p = primes.pop();

    const offsets = [...repeat(buildOffsetList(primes), p)];

    let n = 1;
    for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] !== null) {
             n += offsets[i];
        }

        if (n % p === 0) {
            if (i + 1 < offsets.length) {
                offsets[i] += offsets[i + 1];
                n += offsets[i + 1];
                offsets[i + 1] = null;
            }
        }
    }
    
    return offsets.filter(offset => offset !== null);
};

export function* possiblePrimes(firstPrimes = [2, 3, 5, 7, 11]): It<number> {
    const offsets = buildOffsetList([...firstPrimes]);

    yield* firstPrimes;
    
    let n = 1;

    for (const offset of cycle(offsets)) {
        n += offset;
        yield n;
    }
}

export const primes = () => filter(possiblePrimes(), isPrimeSieved());