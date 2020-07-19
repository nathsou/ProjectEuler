import { foldLeftIter, takeWhile } from "../Utils/iters";
import { primes, isPrime } from "../Utils/primes";

const pb50 = (m = 10 ** 6) => {
    // build cumulative sums up to m
    // so that sum(primes, from, to) = sums[to] - sums[from]
    const sums = [...takeWhile(foldLeftIter(primes(), (sum, p) => sum + p, 0), sum => sum <= m)];

    let longestSeq = 0;
    let longestPrime = 0;

    for (let i = 0; i < sums.length - 1; i++) {
        for (let j = i + 1; j < sums.length; j++) {
            if (j - i < longestSeq) continue;
            const n = sums[j] - sums[i];
            if (isPrime(n)) {
                longestSeq = j - i;
                longestPrime = n;
            }
        }
    }

    return longestPrime;
};

console.log(pb50());