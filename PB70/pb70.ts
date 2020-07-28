import { digitsReversed, filter, find, map, min, pairs, range, takeWhile } from "../Utils/iters";
import { primeFactorsWithExponents } from "../Utils/primeFactors";
import { primes } from "../Utils/primes";

// phi(n) = n * prod (1 - 1 / p) for p in primeFactors(n)
// so n / phi(n) = prod p / (p - 1) 
// therefore n / phi(n) is minimized when the primeFactors(n) are as
// few and as big as possible

// if n is prime, then phi(n) = n - 1 which cannot be a permutation
// of the digits of n

// so n must have at least 2 prime factors p0 and p1

const perm = (n: number): string => {
    return [...digitsReversed(n)].sort().join('');
};

const n_phi = (p0: number, p1: number): number => {
    return (p0 / (p0 - 1)) * (p1 / (p1 - 1));
};

const phi = (p0: number, p1: number): number => {
    return Math.floor((p0 - 1) * (p1 - 1));
};

const pb70 = (): number => {
    const m = 10 ** 7;
    // let's assume our solution has two prime factors 
    // find the first number n less than m with two prime factors
    // a and b such that 2 * a > b (to ensure both are relatively big)
    const [[p0, k0], [p1, k1]] = find(
        map(range(m - 1, 2), primeFactorsWithExponents),
        ps => ps.length === 2 &&
            2 * (ps[0][0] ** ps[0][1]) > ps[1][0] ** ps[1][1]
    ).value;

    // find the biggest factor
    const maxP = Math.max(p0 ** k0, p1 ** k1);

    // find all the primes < maxP
    const ps = [...takeWhile(primes(), p => p < maxP)];
    // find a pair (a, b) where a < maxP and b < maxP
    // satisfying the problem's property
    const [a, b] = min(map(filter(
        pairs(ps, ps),
        ([p0, p1]) =>
            p0 < p1 &&
            p0 * p1 < m &&
            2 * p0 > p1 &&
            perm(p0 * p1) === perm(phi(p0, p1))
    ), ([p0, p1]) => ({ pair: [p0, p1], nphi: n_phi(p0, p1) })
    ), (a, b) => a.nphi < b.nphi).value.pair;

    // n = a * b
    return a * b;
};

console.log(pb70());