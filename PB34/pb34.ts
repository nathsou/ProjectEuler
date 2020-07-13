import { digitsReversed, filter, range } from "../Utils/iters";
import { fact, sum } from "../Utils/math";

// an upper bound is when 99...9 n times > n * 9!
// <=> 10 ** n - 1 > n * 9!
// the first n satisfying this is n = 7
// therefore we only need to check up to 7 * 9!

const isSumOfDigitsFactorials = (num: number) => {
    let rem = num;

    for (const d of digitsReversed(num)) {
        rem -= fact(d);
        if (rem < 0) return false;
    }

    return rem === 0;
};

const pb34 = () => {
    return sum(filter(range(3, 7 * fact(9)), isSumOfDigitsFactorials));
};

console.log(pb34());