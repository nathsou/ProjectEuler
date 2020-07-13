import { digits, filter, It, range, rotate, join, len } from "../Utils/iters";
import { fromDigits } from "../Utils/math";
import { isPrimeMemoized } from "../Utils/prime";

const isCircularPrime = (n: number): boolean => {
    if (!isPrimeMemoized(n)) return false;

    let ds = digits(n);

    for (const _ of range(ds.length - 2)) {
        ds = rotate(ds);
        if (!isPrimeMemoized(fromDigits(ds))) {
            return false;
        }
    }

    return true;
};

const circularPrimes = (max: number): It<number> => {
    return join([2], filter(range(1, max, 2), isCircularPrime));
};

const pb35 = (max = 10 ** 6) => {
    return len(circularPrimes(max));
};

console.log(pb35());