import { fill } from "../Utils/iters";
import { memoize } from "../Utils/memoize";

// adaptation of pb31 (very slow)
const pb78_1 = (max = 100000) => {
    const ways = fill(0n, max + 1);
    ways[0] = 1n;

    for (let i = 1; i <= max; i++) {
        if (i % 1000 === 0) {
            console.log(`${i} / ${max}`);
        }
        for (let j = i; j <= max; j++) {
            ways[j] += ways[j - i];
        }

        if (ways[i] % 1000000n === 0n) {
            return [i, ways[i]];
        }
    }

    return 'not found';
};

const p = memoize((n: number): number => {
    if (n < 0) return 0;
    if (n === 0) return 1;
    let sum = 0;
    let sign = -1;

    for (let k = 1; k <= n; k++) {
        sum += sign * p(n - (k * (3 * k - 1)) / 2);
        sign *= -1;
    }

    return sum;
});

console.log(p(5));