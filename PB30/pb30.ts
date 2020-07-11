// we only need to check up to 6 * 9 ** 5
// since for all n > 6, n * 9 ** 5 < 10 ** n - 1

import { digits, filter, map, range } from "../Utils/iters";
import { sum } from "../Utils/math";
import { memoize } from "../Utils/memoize";


const digitsPowerSum = (power: number): (n: number) => number => {
    const pow = memoize(n => n ** power);
    return (n: number) => {
        return sum(map(digits(n), pow));
    };
};

const pb30 = (power = 5): number => {
    const max = (power + 1) * 9 ** power;
    const f = digitsPowerSum(power);
    return sum(filter(range(2, max), n => f(n) === n));
};

console.log(pb30());