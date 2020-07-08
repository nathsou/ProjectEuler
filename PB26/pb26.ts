import { fractionDigits } from "../Utils/fractions";
import { map, range, max } from "../Utils/iters";

const unitFractionRecurringCycleLength = (n: number): number => {
    if (n === 0) return -1;
    const {
        digits,
        recurring,
        cycleStartIndex
    } = fractionDigits(1n, BigInt(n));

    return recurring ? digits.length - (cycleStartIndex || 0) : 0;
};

const pb26 = (m = 1000) => {
    const [_, n] = max(map(range(0, m), n => unitFractionRecurringCycleLength(n)));
    return n;
};

console.log(pb26(1000));