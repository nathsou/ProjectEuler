import { memoize } from './memoize';

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
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let p of sieve) {
        if (p * p > n) break;
        if (n % p === 0) return false;
    }

    sieve.push(n);
    return true;
}

export function isPrime(n: number): boolean {
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return false;
    }

    return true;
}

export const isPrimeMemoized = memoize(isPrime);