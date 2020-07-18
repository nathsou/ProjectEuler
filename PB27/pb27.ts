import { range } from "../Utils/iters";
import { isPrimeSievedB } from "../Utils/primes";

const isPrime = isPrimeSievedB();

const quadratic = (a: bigint, b: bigint): (n: bigint) => bigint => {
    return (n: bigint) => n ** 2n + a * n + b;
};

const primeSeriesLen = (a: bigint, b: bigint): number => {
    let len = 0;

    const f = quadratic(a, b);

    for (let n = 0n; true; n++) {
        if (isPrime(f(n))) {
            len++;
        } else {
            return len;
        }
    }
};

const pb27 = () => {
    let maxLen = 0;
    let [maxA, maxB] = [0n, 0n];

    for (const a of range(-999n, 999n)) {
        for (const b of range(-1000n, 1000n)) {
            const len = primeSeriesLen(a, b);

            if (len > maxLen) {
                maxLen = len;
                [maxA, maxB] = [a, b];
            }
        }
    }

    return maxA * maxB;
};

console.log(Number(pb27()));