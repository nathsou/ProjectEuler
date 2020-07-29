import { count, digitsReversed, map, range } from "../Utils/iters";
import { fact, sum } from "../Utils/math";

const digitsFactorialSum = (n: number): number => {
    return sum(map(digitsReversed(n), fact));
};

const digitFactorialChainLen = () => {
    const memo = new Map<number, number>();

    return (n: number) => {
        if (memo.has(n)) return memo.get(n);
        let m = n;
        const seq = new Set<number>();
        let len = 0;

        do {
            seq.add(m);
            m = digitsFactorialSum(m);
            len++;
            if (memo.has(m)) {
                const totalLen = len + memo.get(m);
                memo.set(n, totalLen);
                return totalLen;
            }
        } while (!seq.has(m));

        memo.set(n, len);
        return len;
    };
};

const pb74 = (l = 60, m = 10 ** 6): number => {
    const chainLen = digitFactorialChainLen();
    return count(range(1, m), n => chainLen(n) === l);
};

console.log(pb74());