import { divisors, sum } from "../Utils/math";

export const isAmicable = (a: number): boolean => {
    const b = sum(divisors(a)) - a;
    const c = sum(divisors(b)) - b;
    return a === c && a !== b;
};

const pb21 = (max = 10000) => {
    let total = 0;
    for (let n = 0; n < max; n++) {
        if (isAmicable(n)) {
            total += n;
        }
    }

    return total;
};

console.log(pb21());