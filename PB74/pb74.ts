import { count, digitsReversedB, map, range } from "../Utils/iters";
import { factB, sumB } from "../Utils/math";

const digitsFactorialSum = (n: bigint): bigint => {
    return sumB(map(digitsReversedB(n), factB));
};

const digitFactorialChainLen = () => {
    const memo = new Map<bigint, number>();

    return (n: bigint) => {
        if (memo.has(n)) return memo.get(n);
        let m = n;
        const seq = new Set<bigint>();
        let len = 0;

        do {
            seq.add(m);
            m = digitsFactorialSum(m);
            len++;
            if (memo.has(m)) {
                memo.set(n, len + memo.get(m));
                return len + memo.get(m);
            }
        } while (!seq.has(m));

        memo.set(n, len);
        return len;
    };
};

const pb74 = (l = 60, m = 10n ** 6n): number => {
    const chainLen = digitFactorialChainLen();
    return count(range(1n, m), n => chainLen(n) === l);
};

console.log(pb74());