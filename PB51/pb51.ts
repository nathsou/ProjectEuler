import { occurences } from "../Utils/functions";
import { digits, filter, len, map, range } from "../Utils/iters";
import { fromDigits } from "../Utils/math";
import { isPrime, primes } from "../Utils/primes";

const repeatingDigits = (n: number): Array<[number, number[]]> => {
    return [...filter(occurences(digits(n)).entries(), ([_, count]) => count.length > 1)];
};

const replace = <T>(elems: T[], value: T, indices: number[]): T[] => {
    const replaced = [...elems];

    for (const idx of indices) {
        replaced[idx] = value;
    }

    return replaced;
};

const pb51 = (m = 8) => {
    for (const p of primes()) {
        const repeating = [...repeatingDigits(p)];

        if (repeating.length > 0) {
            const ds = digits(p);
            for (const [_, indices] of repeating) {
                const primes = filter(
                        map(range(indices[0] === 0 ? 1 : 0, 9), n => fromDigits(replace(ds, n, indices))),
                    isPrime
                );

                if (len(primes) === m) {
                    return p;
                }                
            }
        }
    }
};

console.log(pb51());